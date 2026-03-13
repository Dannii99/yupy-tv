import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4 lg:p-0 transition-colors duration-500">
      
      <!-- Theme Toggle -->
      <button 
        (click)="themeService.toggleTheme()"
        class="fixed top-6 right-6 z-50 p-3 rounded-2xl bg-surface border border-border shadow-xl hover:shadow-primary/20 hover:border-primary/40 transition-all active:scale-90 group"
        [title]="themeService.theme() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <lucide-icon 
          [name]="themeService.theme() === 'dark' ? 'sun' : 'moon'" 
          class="w-5 h-5 text-text-base group-hover:text-primary transition-colors"
        ></lucide-icon>
      </button>

      <!-- Split Layout Container -->
      <div class="max-w-6xl w-full bg-surface rounded-[2.5rem] shadow-2xl border border-border/50 overflow-hidden flex flex-col lg:flex-row min-h-[700px] transition-colors duration-500">
        
        <!-- Left Side: Branding / Hero (Desktop) -->
        <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-purple-900 to-indigo-900 p-16 flex-col justify-between relative overflow-hidden group">
          <!-- Decor Background -->
          <div class="absolute -right-20 -top-20 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-black/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          
          <div class="relative z-10">
            <div class="flex items-center space-x-3 mb-10">
              <lucide-icon name="play" class="w-12 h-12 text-white"></lucide-icon>
              <span class="text-3xl font-black text-white tracking-tight">YUPI<span class="text-white/70">TV</span></span>
            </div>
            
            <h1 class="text-5xl font-extrabold text-white leading-tight mb-6">
              Connect with <br> 
              <span class="text-white/60">your favorite</span> <br>
              content.
            </h1>
            <p class="text-white/70 text-lg max-w-sm leading-relaxed">
              Experience the best streaming discovery and management ecosystem. All your platforms in one single, polished place.
            </p>
          </div>

          <div class="relative z-10">
            <div class="flex -space-x-3 mb-4">
              @for (i of [1,2,3,4]; track i) {
                <div class="w-10 h-10 rounded-full border-2 border-primary bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <lucide-icon name="user" class="w-5 h-5 text-white/50"></lucide-icon>
                </div>
              }
              <div class="w-10 h-10 rounded-full border-2 border-primary bg-white text-primary flex items-center justify-center font-bold text-xs">
                +2k
              </div>
            </div>
            <p class="text-white/80 text-sm font-medium">Join 2,400+ viewers active right now.</p>
          </div>
        </div>

        <!-- Right Side: Auth Form -->
        <div class="flex-1 p-8 lg:p-20 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-700">
          
          <div class="max-w-md mx-auto w-full">
            <!-- Mobile Header -->
            <div class="flex lg:hidden items-center justify-center space-x-2 mb-8">
              <lucide-icon name="play" class="w-8 h-8 text-primary"></lucide-icon>
              <span class="text-2xl font-black text-text-base">YUPI<span class="text-primary">TV</span></span>
            </div>

            <header class="mb-10 text-center lg:text-left">
              <h2 class="text-3xl font-bold text-text-base mb-2">Welcome back</h2>
              <p class="text-text-muted">Enter your credentials to access your dashboard.</p>
            </header>

            <!-- Social Logins -->
            <div class="flex flex-col gap-3 mb-8">
              <button class="flex items-center justify-center gap-3 w-full px-4 py-3.5 bg-surface border border-border rounded-2xl text-sm font-bold text-text-base hover:bg-primary/5 hover:border-primary/40 transition-all active:scale-[0.98] shadow-sm">
                <lucide-icon name="chrome" class="w-5 h-5 text-red-500"></lucide-icon>
                Continue with Google
              </button>
              <div class="grid grid-cols-2 gap-3">
                <button class="flex items-center justify-center gap-3 px-4 py-3 bg-surface border border-border rounded-2xl text-sm font-bold text-text-base hover:bg-primary/5 hover:border-primary/40 transition-all active:scale-[0.98] shadow-sm">
                  <lucide-icon name="facebook" class="w-5 h-5 text-blue-600"></lucide-icon>
                  Facebook
                </button>
                <button class="flex items-center justify-center gap-3 px-4 py-3 bg-surface border border-border rounded-2xl text-sm font-bold text-text-base hover:bg-primary/5 hover:border-primary/40 transition-all active:scale-[0.98] shadow-sm">
                  <lucide-icon name="apple" class="w-5 h-5 text-text-base"></lucide-icon>
                  Apple
                </button>
              </div>
            </div>

            <div class="relative flex items-center mb-8">
              <div class="flex-grow border-t border-border"></div>
              <span class="flex-shrink mx-4 text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">or use email</span>
              <div class="flex-grow border-t border-border"></div>
            </div>

            <!-- Email Login Form -->
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="space-y-2">
                <label for="email" class="text-xs font-black text-text-base uppercase tracking-wider ml-1">Email Address</label>
                <div class="relative group">
                  <lucide-icon name="mail" class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors"></lucide-icon>
                  <input 
                    id="email"
                    type="email" 
                    formControlName="email"
                    placeholder="name@example.com"
                    class="w-full pl-11 pr-4 py-4 bg-background border border-border rounded-2xl text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-text-muted/50"
                  >
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between ml-1">
                  <label for="password" class="text-xs font-black text-text-base uppercase tracking-wider">Password</label>
                  <a href="#" class="text-xs text-primary font-bold hover:underline">Forgot password?</a>
                </div>
                <div class="relative group">
                  <lucide-icon name="lock" class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors"></lucide-icon>
                  <input 
                    id="password"
                    [type]="showPassword() ? 'text' : 'password'" 
                    formControlName="password"
                    placeholder="••••••••"
                    class="w-full pl-11 pr-12 py-4 bg-background border border-border rounded-2xl text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-text-muted/50"
                  >
                  <button 
                    type="button"
                    (click)="showPassword.set(!showPassword())"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-base transition-colors"
                  >
                    <lucide-icon [name]="showPassword() ? 'eye-off' : 'eye'" class="w-4 h-4"></lucide-icon>
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                [disabled]="loginForm.invalid || isLoading()"
                class="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center"
              >
                @if (isLoading()) {
                  <lucide-icon name="loader-2" class="w-5 h-5 animate-spin me-2"></lucide-icon>
                  Logging in...
                } @else {
                  Login to your account
                  <lucide-icon name="arrow-right" class="w-4 h-4 ms-2"></lucide-icon>
                }
              </button>
            </form>

            <footer class="mt-10 text-center">
              <p class="text-sm text-text-muted font-medium">
                Don't have an account? 
                <a href="#" class="text-primary font-black hover:underline">Sign up for free</a>
              </p>
            </footer>
          </div>

        </div>

      </div>

      <!-- Subtle background decor -->
      <div class="fixed inset-0 -z-10 bg-background overflow-hidden transition-colors duration-500">
        <div class="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]"></div>
      </div>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public themeService = inject(ThemeService);

  showPassword = signal(false);
  isLoading = signal(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      }, 1500);
    }
  }
}
