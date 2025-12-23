
/**
 * Simulated Backend Service for Geekofy
 * Structure ready for MongoDB/PostgreSQL API integration.
 */

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: any;
  errorField?: 'email' | 'password' | 'otp' | 'general';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string | null;
  author: string;
  date: string;
  category: string;
}

export interface OnboardingData {
  businessName: string;
  establishmentYear: string;
  categories: string[];
  profileImage: string | null;
  businessId: string;
}

class BackendService {
  // In a real production app, you would use this URI in your Node.js/Bun server.
  // Never expose raw DB URIs in the frontend. 
  // This service mimics calling an API that talks to MongoDB.
  private API_BASE = "https://api.geekofy.com/v1"; 

  private getStorage<T>(key: string, defaultVal: T): T {
    const saved = localStorage.getItem(`geekofy_${key}`);
    return saved ? JSON.parse(saved) : defaultVal;
  }

  private setStorage(key: string, val: any) {
    localStorage.setItem(`geekofy_${key}`, JSON.stringify(val));
  }

  /**
   * Authentication
   */
  async login(identifier: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Fix: Added phone property to default user object to resolve type error and used explicit generic for getStorage
        const users = this.getStorage<{email: string; password: string; phone?: string}[]>('users', [{ email: 'test@geekofy.com', password: 'password123', phone: '1234567890' }]);
        const user = users.find(u => u.email === identifier || u.phone === identifier);
        
        if (!user) {
          resolve({ success: false, message: 'User not found.', errorField: 'email' });
        } else if (user.password !== password) {
          resolve({ success: false, message: 'Invalid password.', errorField: 'password' });
        } else {
          resolve({ success: true, user: { email: user.email } });
        }
      }, 800);
    });
  }

  async requestOtp(identifier: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[Database] Storing pending OTP for ${identifier}`);
        resolve({ success: true });
      }, 1000);
    });
  }

  async verifyOtp(code: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code === '123456') resolve({ success: true });
        else resolve({ success: false, message: 'Invalid OTP', errorField: 'otp' });
      }, 800);
    });
  }

  // Fix: Added missing resetPasswordRequest method used in Auth.tsx
  async resetPasswordRequest(identifier: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[Database] Reset link sent for ${identifier}`);
        resolve();
      }, 500);
    });
  }

  /**
   * FAQ Persistence Logic (MongoDB / Postgres style)
   */
  async getFaqs(): Promise<FAQ[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const faqs = this.getStorage<FAQ[]>('faqs', [
          { id: '1', question: 'Do you offer warranty on screen repairs?', answer: 'Yes, we provide a 6-month limited warranty on all screen replacements.', author: 'Owner', date: '2023-10-01', category: 'General' },
          { id: '2', question: 'How long does a battery replacement take?', answer: null, author: 'User88', date: '2023-10-25', category: 'Mobile' }
        ]);
        resolve(faqs);
      }, 500);
    });
  }

  async askQuestion(question: string, category: string): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const faqs = this.getStorage<FAQ[]>('faqs', []);
        const newFaq: FAQ = {
          id: Date.now().toString(),
          question,
          answer: null,
          author: 'Anonymous User',
          date: new Date().toISOString().split('T')[0],
          category
        };
        this.setStorage('faqs', [newFaq, ...faqs]);
        resolve({ success: true });
      }, 1000);
    });
  }

  async answerQuestion(id: string, answer: string): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const faqs = this.getStorage<FAQ[]>('faqs', []);
        const index = faqs.findIndex(f => f.id === id);
        if (index !== -1) {
          faqs[index].answer = answer;
          this.setStorage('faqs', faqs);
        }
        resolve({ success: true });
      }, 1000);
    });
  }

  /**
   * Business Management
   */
  async isBusinessIdAvailable(id: string): Promise<boolean> {
    const businesses = this.getStorage('businesses', ['geek-central']);
    return !businesses.includes(id.toLowerCase());
  }

  // Fix: Added missing generateUniqueId method used in Onboarding.tsx
  async generateUniqueId(businessName: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const base = businessName.toLowerCase().replace(/\s+/g, '-');
        const random = Math.floor(Math.random() * 1000);
        resolve(`${base}-${random}`);
      }, 500);
    });
  }

  async submitOnboarding(data: OnboardingData): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const businesses = this.getStorage('businesses', []);
        businesses.push(data.businessId);
        this.setStorage('businesses', businesses);
        this.setStorage(`biz_${data.businessId}`, data);
        resolve({ success: true });
      }, 1500);
    });
  }

  async socialLogin(provider: string): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 500));
  }
}

export const backend = new BackendService();
