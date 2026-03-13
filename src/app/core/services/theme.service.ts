import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'yupi-tv-theme';
  
  // Initialize from localStorage if available, otherwise default to dark
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Synchronize the DOM and localStorage whenever the theme signal changes
    effect(() => {
      const currentTheme = this.theme();
      
      if (isPlatformBrowser(this.platformId)) {
        // Apply class to document element
        if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Persist to localStorage
        localStorage.setItem(this.storageKey, currentTheme);
      }
    });
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);
  }

  private getInitialTheme(): Theme {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem(this.storageKey) as Theme;
      
      // If we have a saved theme, use it
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      
      // Fallback: Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    
    // Default to 'dark' for everything else (SSR or no preference)
    return 'dark';
  }
}
