import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-streamers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl font-bold text-white mb-2">Explore Streamers</h1>
        <p class="text-slate-400">Discover top content creators across all platforms.</p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @for (i of [1,2,3,4,5,6,7,8]; track i) {
          <div class="bg-surface-dark border border-border-dark rounded-2xl overflow-hidden hover:border-primary/50 transition-all group shadow-lg">
            <div class="aspect-video bg-background-dark/50 relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent opacity-60"></div>
               <div class="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">Live</div>
               <div class="absolute bottom-3 left-3 right-3">
                 <div class="w-12 h-12 rounded-full border-2 border-primary bg-background-dark mb-2"></div>
               </div>
            </div>
            <div class="p-4">
              <div class="font-bold text-white mb-1 group-hover:text-primary transition-colors">Streamer Name {{ i }}</div>
              <div class="text-xs text-slate-500 mb-3">Playing Awesome Game</div>
              <div class="flex items-center justify-between">
                <span class="text-[10px] px-2 py-1 bg-white/5 text-slate-400 rounded-full border border-border-dark">Twitch</span>
                <span class="text-[10px] text-slate-400">1.2k Viewers</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamersComponent {}
