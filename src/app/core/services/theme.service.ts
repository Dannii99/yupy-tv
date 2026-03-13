import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'yupi-tv-theme';
  
  // Default to 'dark' as per project guidelines
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Sync theme with document class whenever it changes
    effect(() => {
      const currentTheme = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        if (currentTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
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
      if (savedTheme) return savedTheme;
      
      // Fallback to system preference or default 'dark'
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  }
}
