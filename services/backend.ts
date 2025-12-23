
/**
 * Simulated Backend Service for Geekofy
 * Manages authentication, OTP generation, social identity, and business onboarding.
 */

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: any;
  errorField?: 'email' | 'password' | 'otp' | 'general';
}

export interface OnboardingData {
  businessName: string;
  establishmentYear: string;
  categories: string[];
  profileImage: string | null;
  businessId: string;
}

class BackendService {
  private mockUsers = [
    { email: 'test@geekofy.com', phone: '1234567890', password: 'password123' }
  ];

  private registeredBusinessIds = ['geek-central', 'tech-fixers', 'apple-care'];

  /**
   * Login with email/phone and password
   */
  async login(identifier: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.mockUsers.find(u => u.email === identifier || u.phone === identifier);
        
        if (!user) {
          resolve({ success: false, message: 'User not found.', errorField: 'email' });
        } else if (user.password !== password) {
          resolve({ success: false, message: 'Invalid password. Please try again.', errorField: 'password' });
        } else {
          resolve({ success: true, user: { email: user.email } });
        }
      }, 1000);
    });
  }

  /**
   * Request OTP for Signup or Passwordless Login
   */
  async requestOtp(identifier: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[Backend] Sending OTP to ${identifier}: 123456`);
        resolve({ success: true, message: 'OTP sent successfully.' });
      }, 1200);
    });
  }

  /**
   * Verify the 6-digit OTP
   */
  async verifyOtp(code: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({ success: true, user: { email: 'newuser@example.com' } });
        } else {
          resolve({ success: false, message: 'Invalid OTP code.', errorField: 'otp' });
        }
      }, 800);
    });
  }

  /**
   * Initiate Social Login
   */
  async socialLogin(provider: 'Google' | 'Apple'): Promise<void> {
    console.log(`[Backend] Redirecting to ${provider} OAuth...`);
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  /**
   * Forgot Password request
   */
  async resetPasswordRequest(identifier: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Reset instructions sent to your email/phone.' });
      }, 1000);
    });
  }

  /**
   * Check if a Business ID is already taken
   */
  async isBusinessIdAvailable(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(!this.registeredBusinessIds.includes(id.toLowerCase()));
      }, 500);
    });
  }

  /**
   * Generate a random unique business ID
   */
  async generateUniqueId(name: string): Promise<string> {
    const base = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let candidate = base || 'geek';
    let counter = 1;
    
    while (this.registeredBusinessIds.includes(candidate)) {
      candidate = `${base}-${Math.floor(Math.random() * 10000)}`;
      counter++;
    }
    return candidate;
  }

  /**
   * Final onboarding submission
   */
  async submitOnboarding(data: OnboardingData): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[Backend] New Business Registered:', data);
        this.registeredBusinessIds.push(data.businessId);
        resolve({ success: true });
      }, 2000);
    });
  }
}

export const backend = new BackendService();
