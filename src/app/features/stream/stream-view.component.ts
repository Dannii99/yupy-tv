import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  platform: 'Twitch' | 'YouTube' | 'Kick';
  time: string;
}

interface Clip {
  id: string;
  title: string;
  viewers: string;
  time: string;
}

@Component({
  selector: 'app-stream-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500 relative min-h-full">
      
      <!-- Main Content Area: Video, Info, Stats, Clips -->
      <main class="flex-1 min-w-0 space-y-8">
        
        <!-- Video Section -->
        <section class="space-y-6">
          <div class="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group border border-border/50 ring-1 ring-white/5">
            <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-transparent">
               <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-all duration-500 cursor-pointer backdrop-blur-sm">
                  <lucide-icon name="play" class="w-10 h-10 md:w-12 md:h-12 text-primary fill-primary"></lucide-icon>
               </div>
            </div>
            
            <!-- Live Status Overlay -->
            <div class="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2">
              <span class="px-3 py-1 bg-red-600 text-white text-[10px] md:text-xs font-black rounded-lg uppercase tracking-widest shadow-2xl flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                Live
              </span>
              <span class="px-3 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] md:text-xs font-bold rounded-lg shadow-2xl border border-white/10">
                1080p60
              </span>
            </div>

            <!-- Basic Player Controls -->
            <div class="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center px-6 md:px-8 gap-4 md:gap-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
               <button class="text-white hover:text-primary transition-colors"><lucide-icon name="play" class="w-5 h-5 md:w-6 md:h-6 fill-current"></lucide-icon></button>
               <div class="flex-1 h-1 md:h-1.5 bg-white/20 rounded-full cursor-pointer relative">
                 <div class="w-1/3 h-full bg-primary rounded-full shadow-[0_0_10px_rgba(146,76,250,0.8)]"></div>
               </div>
               <div class="flex items-center gap-3 md:gap-4">
                 <lucide-icon name="settings" class="w-4 h-4 md:w-5 md:h-5 text-white hover:text-primary cursor-pointer transition-colors"></lucide-icon>
                 <lucide-icon name="maximize" class="w-4 h-4 md:w-5 md:h-5 text-white hover:text-primary cursor-pointer transition-colors"></lucide-icon>
               </div>
            </div>
          </div>

          <!-- Streamer Info -->
          <div class="flex flex-col md:flex-row md:items-start gap-6 px-2">
             <div class="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] border-2 border-primary bg-surface p-1 shadow-2xl shrink-0">
                <div class="w-full h-full rounded-[1.75rem] bg-background flex items-center justify-center overflow-hidden">
                  <lucide-icon name="user" class="w-10 h-10 text-primary/40"></lucide-icon>
                </div>
             </div>
             <div class="min-w-0 flex-1 space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h1 class="text-2xl md:text-3xl font-black text-text-base tracking-tight truncate">{{ streamerName }}</h1>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg border border-primary/20 uppercase tracking-wider">{{ category }}</span>
                    <div class="h-1 w-1 rounded-full bg-border"></div>
                    <span class="text-xs font-bold text-text-muted flex items-center gap-1.5">
                      <lucide-icon name="users" class="w-3.5 h-3.5"></lucide-icon>
                      12.4k
                    </span>
                  </div>
                </div>
                <h2 class="text-lg md:text-xl font-bold text-text-base leading-tight">{{ streamTitle }}</h2>
                <div class="flex flex-wrap items-center gap-4 text-xs font-bold text-text-muted">
                  <span class="flex items-center gap-1.5"><lucide-icon name="clock" class="w-3.5 h-3.5 text-primary"></lucide-icon> 4h 21m live</span>
                  <span class="flex items-center gap-1.5"><lucide-icon name="eye" class="w-3.5 h-3.5 text-primary"></lucide-icon> 245.2k total views</span>
                </div>
             </div>
          </div>
        </section>

        <!-- Actions & Analytics Row -->
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 px-2">
          <!-- Main Actions -->
          <div class="xl:col-span-7 flex flex-wrap items-center gap-3">
            <button class="flex-1 sm:flex-none px-8 py-3.5 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95 text-sm uppercase tracking-wider">
              <lucide-icon name="heart" class="w-5 h-5 fill-white"></lucide-icon>
              Follow
            </button>
            <button class="flex-1 sm:flex-none px-6 py-3.5 bg-surface border border-border text-text-base font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/5 hover:border-primary/30 transition-all text-sm uppercase tracking-wider">
              <lucide-icon name="dollar-sign" class="w-5 h-5 text-primary"></lucide-icon>
              Donate
            </button>
            <button class="p-3.5 bg-surface border border-border text-text-muted hover:text-text-base rounded-2xl transition-all shadow-sm">
              <lucide-icon name="share-2" class="w-5 h-5"></lucide-icon>
            </button>
          </div>

          <!-- Quick Stats -->
          <div class="xl:col-span-5 grid grid-cols-2 gap-4">
             <div class="bg-surface border border-border p-4 rounded-[1.5rem] shadow-sm relative overflow-hidden group">
                <div class="flex items-center gap-3 mb-2 relative z-10">
                   <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform">
                      <lucide-icon name="thumbs-up" class="w-5 h-5"></lucide-icon>
                   </div>
                   <div>
                      <div class="text-[10px] font-black text-text-muted uppercase tracking-widest">Engagement</div>
                      <div class="text-lg font-black text-text-base">18.4%</div>
                   </div>
                </div>
                <div class="w-full h-1 bg-background rounded-full overflow-hidden">
                   <div class="w-[74%] h-full bg-amber-500 rounded-full"></div>
                </div>
             </div>

             <div class="bg-surface border border-border p-4 rounded-[1.5rem] shadow-sm relative overflow-hidden group">
                <div class="flex items-center gap-3 mb-2 relative z-10">
                   <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                      <lucide-icon name="bar-chart-3" class="w-5 h-5"></lucide-icon>
                   </div>
                   <div>
                      <div class="text-[10px] font-black text-text-muted uppercase tracking-widest">Peak</div>
                      <div class="text-lg font-black text-text-base">42.8k</div>
                   </div>
                </div>
                <div class="w-full h-1 bg-background rounded-full overflow-hidden">
                   <div class="w-[85%] h-full bg-primary rounded-full"></div>
                </div>
             </div>
          </div>
        </div>

        <!-- Latest Clips Section -->
        <section class="space-y-6 pt-4 px-2 pb-12">
          <div class="flex items-center justify-between">
             <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <lucide-icon name="video" class="w-6 h-6"></lucide-icon>
                </div>
                <h3 class="text-2xl font-black text-text-base tracking-tight">Latest Clips</h3>
             </div>
             <button class="text-sm font-bold text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
               View All
               <lucide-icon name="chevron-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></lucide-icon>
             </button>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (clip of clips; track clip.id) {
              <div class="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-all shadow-lg cursor-pointer">
                <div class="aspect-video bg-background relative overflow-hidden">
                   <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                   <div class="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-md text-[10px] font-black text-white rounded-lg border border-white/10">0:30</div>
                   <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div class="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <lucide-icon name="play" class="w-6 h-6 text-white fill-white"></lucide-icon>
                      </div>
                   </div>
                </div>
                <div class="p-4 space-y-2">
                   <div class="text-sm font-bold text-text-base truncate group-hover:text-primary transition-colors">{{ clip.title }}</div>
                   <div class="flex items-center justify-between text-[11px] text-text-muted font-bold uppercase tracking-wider">
                      <span class="flex items-center gap-1"><lucide-icon name="eye" class="w-3 h-3"></lucide-icon> {{ clip.viewers }}</span>
                      <span>{{ clip.time }}</span>
                   </div>
                </div>
              </div>
            }
          </div>
        </section>

      </main>

      <!-- Right Side: Chat Panel (Sticky & Viewport Height) -->
      <aside class="w-full lg:w-[380px] xl:w-[420px] shrink-0"> <!-- lg:top-[calc(4rem+1.5rem)]  -->
        <div class="lg:sticky h-[600px] lg:h-[calc(100vh-theme(spacing.24))] flex flex-col bg-surface border border-border rounded-3xl overflow-hidden shadow-2xl">
          
          <!-- Chat Header -->
          <div class="p-5 border-b border-border bg-background/50 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <lucide-icon name="message-square" class="w-5 h-5"></lucide-icon>
              </div>
              <h3 class="font-black text-text-base tracking-tight text-lg uppercase tracking-widest">Chat</h3>
            </div>
            <div class="flex items-center gap-2 px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-lg">
               <div class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
               <span class="text-[10px] font-black text-red-500 uppercase tracking-widest">Live</span>
            </div>
          </div>

          <!-- Chat Tabs -->
          <div class="p-2 bg-background/30 flex gap-1 border-b border-border shrink-0">
            @for (platform of chatPlatforms; track platform) {
              <button 
                (click)="selectedChatPlatform.set(platform)"
                class="flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                [class.bg-surface]="selectedChatPlatform() === platform"
                [class.text-primary]="selectedChatPlatform() === platform"
                [class.shadow-lg]="selectedChatPlatform() === platform"
                [class.text-text-muted]="selectedChatPlatform() !== platform"
                [class.hover:text-text-base]="selectedChatPlatform() !== platform"
              >
                {{ platform }}
              </button>
            }
          </div>

          <!-- Chat Messages (Scrollable Area) -->
          <div class="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth custom-scrollbar bg-surface/50">
            @for (msg of chatMessages(); track msg.id) {
              <div class="flex flex-col gap-1.5 group animate-in slide-in-from-right-2 duration-300">
                <div class="flex items-center gap-2">
                  <span 
                    class="text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-tighter border border-black/5"
                    [class]="platformStyles[msg.platform]"
                  >
                    {{ msg.platform }}
                  </span>
                  <span class="text-xs font-black text-text-base group-hover:text-primary transition-colors cursor-pointer truncate max-w-[120px]">{{ msg.user }}</span>
                  <span class="text-[10px] text-text-muted/40 font-bold ml-auto">{{ msg.time }}</span>
                </div>
                <p class="text-xs text-text-muted leading-relaxed font-medium bg-background/30 p-2.5 rounded-xl border border-transparent group-hover:border-border transition-all">
                  {{ msg.message }}
                </p>
              </div>
            }
          </div>

          <!-- Chat Input (Always Visible) -->
          <div class="p-5 bg-background/50 border-t border-border space-y-4 shrink-0">
            <div class="relative group">
              <input 
                type="text" 
                placeholder="Send a message..." 
                class="w-full bg-surface border border-border rounded-2xl py-3.5 pl-5 pr-12 text-sm text-text-base outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
              >
              <button class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors p-1">
                <lucide-icon name="smile" class="w-5 h-5"></lucide-icon>
              </button>
            </div>
            <div class="flex items-center justify-between">
              <button class="p-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                <lucide-icon name="settings" class="w-4 h-4"></lucide-icon>
              </button>
              <button class="px-8 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-3 hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95">
                <span>Send</span>
                <lucide-icon name="send" class="w-4 h-4"></lucide-icon>
              </button>
            </div>
          </div>

        </div>
      </aside>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: var(--color-primary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamViewComponent {
  streamerName = 'Ninja';
  streamTitle = 'FORTNITE RANKED GRINDING! | !sub !discord';
  category = 'Fortnite';
  
  chatPlatforms = ['All', 'Twitch', 'YouTube', 'Kick'];
  selectedChatPlatform = signal('All');

  chatMessages = signal<ChatMessage[]>([
    { id: '1', user: 'ProGamer99', message: 'That play was insane! 🔥', platform: 'Twitch', time: '12:01' },
    { id: '2', user: 'Sarah_Streaming', message: 'HYPE HYPE HYPE', platform: 'YouTube', time: '12:02' },
    { id: '3', user: 'AlexAdmin', message: 'Welcome everyone to the stream!', platform: 'Kick', time: '12:02' },
    { id: '4', user: 'GamerX', message: 'PogChamp', platform: 'Twitch', time: '12:03' },
    { id: '5', user: 'VictorySeeker', message: 'How do you do that?', platform: 'YouTube', time: '12:03' },
    { id: '6', user: 'ShadowMaster', message: 'Subscribe for more content!', platform: 'Kick', time: '12:04' },
    { id: '7', user: 'NinjaFan_1', message: 'Go Ninja Go!', platform: 'Twitch', time: '12:05' },
    { id: '8', user: 'StreamKing', message: 'Amazing quality today', platform: 'Twitch', time: '12:05' },
    { id: '9', user: 'LootBox_Hero', message: 'Did you see that drop?', platform: 'Twitch', time: '12:06' },
    { id: '10', user: 'NightOwl', message: 'Streaming until dawn again?', platform: 'Kick', time: '12:07' },
  ]);

  clips: Clip[] = [
    { id: '1', title: 'Insane 360 Headshot', viewers: '12k', time: '2h ago' },
    { id: '2', title: 'Funny moment with chat', viewers: '8k', time: '5h ago' },
    { id: '3', title: 'New record unlocked!', viewers: '45k', time: '1d ago' },
    { id: '4', title: 'Wait for the end...', viewers: '5k', time: '2d ago' },
  ];

  platformStyles = {
    'Twitch': 'bg-[#9146ff]/20 text-[#9146ff]',
    'YouTube': 'bg-[#ff0000]/20 text-[#ff0000]',
    'Kick': 'bg-[#53fc18]/20 text-[#000000] dark:text-[#53fc18]'
  };
}
