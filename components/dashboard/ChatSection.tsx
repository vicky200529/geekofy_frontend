
import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Bot, User, Sparkles, Loader2, PlayCircle, StopCircle } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// --- Encoding/Decoding Helpers for Live API ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am your Geekofy assistant. How can I help your business grow today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const toggleVoiceMode = async () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      sessionRef.current?.close();
      return;
    }

    try {
      setIsConnecting(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are a helpful, enthusiastic business assistant for Geekofy. Keep responses professional but tech-savvy.',
        },
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsVoiceActive(true);
            const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const ctx = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onclose: () => setIsVoiceActive(false),
          onerror: () => setIsVoiceActive(false),
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error(e);
      setIsConnecting(false);
    }
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: inputText }]);
    // In a real app, this would also hit the model. Mocking response for UI demonstration.
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'I understand. Let me look into your business insights for that.' }]);
    }, 800);
    setInputText('');
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              Geek Assistant <Sparkles size={16} className="text-blue-500" />
            </h3>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isVoiceActive ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></span>
              <span className="text-xs text-gray-500 font-medium">{isVoiceActive ? 'Voice Mode Active' : 'Online'}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={toggleVoiceMode}
          disabled={isConnecting}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all shadow-sm active:scale-95 ${
            isVoiceActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {isConnecting ? <Loader2 size={18} className="animate-spin" /> : (isVoiceActive ? <StopCircle size={18} /> : <PlayCircle size={18} />)}
          {isVoiceActive ? 'Stop Voice' : 'Voice Assistant'}
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
              m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isVoiceActive && (
          <div className="flex justify-start">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1 bg-blue-500 rounded-full animate-bounce" style={{height: `${Math.random()*16+8}px`, animationDelay: `${i*0.1}s`}}></div>)}
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Listening...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <button 
            className={`p-3 rounded-full transition-colors ${isVoiceActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-200'}`}
            onClick={toggleVoiceMode}
          >
            {isVoiceActive ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <input 
            type="text" 
            placeholder="Type a message or use voice..." 
            className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button 
            onClick={sendMessage}
            className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
