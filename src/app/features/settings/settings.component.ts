import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 max-w-2xl">
      <header>
        <h1 class="text-3xl font-bold text-white mb-2">Settings</h1>
        <p class="text-slate-400">Manage your profile and application preferences.</p>
      </header>

      <div class="space-y-4">
        <div class="bg-surface-dark border border-border-dark p-6 rounded-2xl">
          <h3 class="text-white font-bold mb-4">Appearance</h3>
          <div class="space-y-3">
             <div class="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-border-dark">
               <span class="text-slate-300">Dark Mode</span>
               <div class="w-10 h-5 bg-primary rounded-full relative shadow-inner">
                 <div class="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
               </div>
             </div>
             <div class="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-border-dark">
               <span class="text-slate-300">Compact Mode</span>
               <div class="w-10 h-5 bg-slate-700 rounded-full relative">
                 <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
               </div>
             </div>
          </div>
        </div>

        <div class="bg-surface-dark border border-border-dark p-6 rounded-2xl">
          <h3 class="text-white font-bold mb-4">Connected Platforms</h3>
          <div class="space-y-3">
             <button class="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-border-dark transition-all flex items-center justify-between group">
               <span class="text-slate-300 group-hover:text-white">Twitch</span>
               <span class="text-xs text-primary">Connected</span>
             </button>
             <button class="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-border-dark transition-all flex items-center justify-between group">
               <span class="text-slate-300 group-hover:text-white">YouTube</span>
               <span class="text-xs text-slate-500">Connect account</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
