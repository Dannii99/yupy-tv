import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 max-w-2xl">
      <header>
        <h1 class="text-3xl font-bold text-text-base mb-2">Settings</h1>
        <p class="text-text-muted">Manage your profile and application preferences.</p>
      </header>

      <div class="space-y-4">
        <div class="bg-surface border border-border p-6 rounded-2xl">
          <h3 class="text-text-base font-bold mb-4">Appearance</h3>
          <div class="space-y-3">
             <!-- Theme Toggle -->
             <div class="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border">
               <div>
                 <div class="text-text-base font-medium">Theme</div>
                 <div class="text-xs text-text-muted">Switch between dark and light mode</div>
               </div>
               
               <div class="flex p-1 bg-background rounded-lg border border-border">
                 <button 
                   (click)="setTheme('light')"
                   [class.bg-primary]="currentTheme() === 'light'"
                   [class.text-white]="currentTheme() === 'light'"
                   [class.text-text-muted]="currentTheme() !== 'light'"
                   class="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:text-primary"
                   [class.hover:text-white]="currentTheme() === 'light'"
                 >
                   Light
                 </button>
                 <button 
                   (click)="setTheme('dark')"
                   [class.bg-primary]="currentTheme() === 'dark'"
                   [class.text-white]="currentTheme() === 'dark'"
                   [class.text-text-muted]="currentTheme() !== 'dark'"
                   class="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:text-primary"
                   [class.hover:text-white]="currentTheme() === 'dark'"
                 >
                   Dark
                 </button>
               </div>
             </div>

             <div class="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border opacity-50 cursor-not-allowed">
               <span class="text-text-base font-medium">Compact Mode</span>
               <div class="w-10 h-5 bg-border rounded-full relative">
                 <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-surface rounded-full"></div>
               </div>
             </div>
          </div>
        </div>

        <div class="bg-surface border border-border p-6 rounded-2xl">
          <h3 class="text-text-base font-bold mb-4">Connected Platforms</h3>
          <div class="space-y-3">
             <button class="w-full text-left p-4 bg-background/50 hover:bg-primary/5 rounded-xl border border-border transition-all flex items-center justify-between group">
               <span class="text-text-muted group-hover:text-text-base">Twitch</span>
               <span class="text-xs text-primary font-medium">Connected</span>
             </button>
             <button class="w-full text-left p-4 bg-background/50 hover:bg-primary/5 rounded-xl border border-border transition-all flex items-center justify-between group">
               <span class="text-text-muted group-hover:text-text-base">YouTube</span>
               <span class="text-xs text-text-muted">Connect account</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private themeService = inject(ThemeService);
  currentTheme = this.themeService.theme;

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
