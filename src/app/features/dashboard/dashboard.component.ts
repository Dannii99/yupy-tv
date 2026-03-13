import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-8 pb-28 md:pb-8 animate-in fade-in duration-500">
      <!-- Welcome Header -->
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-text-base tracking-tight mb-2">Welcome back, {{username}}!</h1>
          <p class="text-text-muted">Here's what's happening with your favorite streamers today.</p>
        </div>
        
        <!-- Platform Tabs -->
        <div class="flex p-1 bg-surface border border-border rounded-xl self-start md:self-auto">
          @for (platform of platforms; track platform) {
            <button 
              (click)="selectedPlatform.set(platform)"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              [class.bg-primary]="selectedPlatform() === platform"
              [class.text-white]="selectedPlatform() === platform"
              [class.text-text-muted]="selectedPlatform() !== platform"
              [class.hover:text-text-base]="selectedPlatform() !== platform"
            >
              {{ platform }}
            </button>
          }
        </div>
      </header>

      <!-- Stat Cards -->
      <div class="flex md:grid overflow-x-auto md:overflow-visible gap-6 pb-4 md:pb-0 scrollbar-hide md:grid-cols-2 lg:grid-cols-4">
        @for (stat of stats; track stat.label) {
          <div class="min-w-[260px] md:min-w-0 bg-surface border border-border p-5 rounded-2xl shadow-sm hover:border-primary/40 transition-all duration-300 group relative overflow-hidden">
            <!-- Subtle accent background -->
            <div class="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors"></div>
            
            <div class="flex items-start justify-between mb-4 relative z-10">
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                [class]="stat.colorClass"
              >
                <lucide-icon [name]="stat.icon" class="w-6 h-6"></lucide-icon>
              </div>
              <div class="flex items-center text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                <lucide-icon name="chevron-right" class="w-3 h-3 me-1 -rotate-90"></lucide-icon>
                {{ stat.trend }}
              </div>
            </div>
            
            <div class="relative z-10">
              <div class="text-text-muted text-sm font-medium mb-1 group-hover:text-text-base transition-colors">{{ stat.label }}</div>
              <div class="text-3xl font-bold text-text-base tracking-tight">{{ stat.value }}</div>
            </div>
          </div>
        }
      </div>

      <!-- Main Dashboard Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-start">
        
        <!-- Live Now Section (8 cols) -->
        <section class="lg:col-span-8 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-text-base flex items-center">
              <span class="flex h-2 w-2 rounded-full bg-red-500 me-3 animate-pulse"></span>
              Live Now
            </h2>
            <button class="text-sm text-primary hover:underline font-medium">View All</button>
          </div>
          
          <div class="flex md:grid overflow-x-auto md:overflow-visible gap-4 pb-4 md:pb-0 scrollbar-hide md:grid-cols-2">
            @for (stream of liveStreams; track stream.id) {
              <div 
                [routerLink]="['/stream', stream.id]"
                class="min-w-[280px] md:min-w-0 bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/30 transition-all shadow-md cursor-pointer"
              >
                <div class="aspect-video relative overflow-hidden bg-background">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <!-- Badges -->
                  <div class="absolute top-3 left-3 flex gap-2">
                    <span class="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg">Live</span>
                    <span class="px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium rounded shadow-lg">{{ stream.platform }}</span>
                  </div>
                  
                  <div class="absolute top-3 right-3">
                    <span class="px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium rounded flex items-center shadow-lg">
                      <lucide-icon name="users" class="w-3 h-3 me-1 text-slate-300"></lucide-icon>
                      {{ stream.viewers }}
                    </span>
                  </div>

                  <div class="absolute bottom-3 left-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full border-2 border-primary bg-background overflow-hidden shadow-xl ring-2 ring-black/20">
                      <div class="w-full h-full bg-primary/20 flex items-center justify-center">
                        <lucide-icon name="user" class="w-5 h-5 text-primary"></lucide-icon>
                      </div>
                    </div>
                    <div>
                      <div class="text-white font-bold text-sm leading-tight drop-shadow-md">{{ stream.name }}</div>
                      <div class="text-slate-300 text-xs line-clamp-1 drop-shadow-md">{{ stream.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Right Side: Recent Alerts (4 cols) -->
        <!-- Rearranged: Stacks after Live Now on mobile, but sits as sidebar on desktop -->
        <aside class="lg:col-span-4 space-y-6 lg:row-span-2">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-text-base flex items-center">
              <lucide-icon name="circle-check" class="w-5 h-5 text-primary me-2"></lucide-icon>
              Recent Alerts
            </h2>
            <button class="text-xs text-text-muted hover:text-primary transition-colors">Clear All</button>
          </div>
          
          <div class="space-y-3">
            @for (alert of recentAlerts; track alert.id) {
              <div class="p-3 md:p-4 bg-surface border border-border rounded-2xl hover:border-primary/20 transition-all duration-200 shadow-sm relative overflow-hidden group">
                <div 
                  class="absolute left-0 top-0 bottom-0 w-1 transition-all duration-200"
                  [class]="alert.type === 'live' ? 'bg-red-500 group-hover:w-1.5' : 'bg-primary group-hover:w-1.5'"
                ></div>
                <div class="flex gap-3 md:gap-4 items-start">
                  <div 
                    class="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 border border-border"
                    [class]="alert.type === 'live' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'"
                  >
                    <lucide-icon [name]="alert.icon" class="w-4 h-4 md:w-5 md:h-5"></lucide-icon>
                  </div>
                  <div class="space-y-1">
                    <p class="text-sm text-text-base font-medium leading-tight">{{ alert.message }}</p>
                    <p class="text-xs text-text-muted">{{ alert.time }}</p>
                  </div>
                </div>
              </div>
            }
            
            <button class="w-full py-3 bg-surface border border-border border-dashed rounded-2xl text-text-muted text-sm font-medium hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all mt-2">
              View Activity Log
            </button>
          </div>
          
          <!-- Pro View Promo -->
          <div class="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-primary to-purple-800 text-white shadow-xl relative overflow-hidden group">
             <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
             <div class="relative z-10">
               <h4 class="font-bold text-lg mb-2">Upgrade to Pro</h4>
               <p class="text-white/80 text-xs mb-4">Multi-stream viewing and advanced analytics for creators.</p>
               <button class="px-4 py-2 bg-white text-primary rounded-lg text-xs font-bold hover:shadow-lg transition-all active:scale-95">Get Started</button>
             </div>
          </div>
        </aside>

        <!-- Trending Games Section -->
        <section class="lg:col-span-8 space-y-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-text-base flex items-center">
              <lucide-icon name="bar-chart-3" class="w-5 h-5 text-primary me-2"></lucide-icon>
              Trending Games
            </h2>
            <button 
              routerLink="/games"
              class="text-sm text-primary hover:underline font-medium"
            >
              View All
            </button>
          </div>
          <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            @for (game of trendingGames; track game.id) {
              <div 
                [routerLink]="['/trending-game', game.id]"
                class="min-w-[160px] max-w-[160px] bg-surface border border-border rounded-xl p-3 hover:border-primary/50 transition-all cursor-pointer group shadow-sm"
              >
                <div class="aspect-[3/4] rounded-lg bg-background mb-3 overflow-hidden shadow-inner">
                  <div class="w-full h-full bg-gradient-to-br from-primary/10 to-surface flex items-center justify-center">
                      <lucide-icon name="play" class="w-8 h-8 text-primary/30 group-hover:scale-110 transition-transform"></lucide-icon>
                  </div>
                </div>
                <div class="font-bold text-text-base text-sm truncate mb-1 group-hover:text-primary transition-colors">{{ game.name }}</div>
                <div class="text-[10px] text-text-muted uppercase tracking-wider font-bold">{{ game.viewers }} viewers</div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  username: string = 'DannyOs'

  platforms = ['All', 'Twitch', 'YouTube', 'Kick'];
  selectedPlatform = signal('All');

  stats = [
    { 
      label: 'Live Now', 
      value: '12', 
      icon: 'video', 
      trend: '15%',
      colorClass: 'bg-red-500/10 text-red-500 border-red-500/20' 
    },
    { 
      label: 'Total Favorites', 
      value: '48', 
      icon: 'heart', 
      trend: '4%',
      colorClass: 'bg-primary/10 text-primary border-primary/20' 
    },
    { 
      label: 'Hours Watched', 
      value: '124.5', 
      icon: 'layout-dashboard', 
      trend: '21%',
      colorClass: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
    },
    { 
      label: 'New Discoveries', 
      value: '5', 
      icon: 'search', 
      trend: '12%',
      colorClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
    },
  ];

  liveStreams = [
    { id: 1, name: 'Ninja', title: 'Fortnite Chill Streams with Friends!', platform: 'Twitch', viewers: '42.5k' },
    { id: 2, name: 'MrBeast', title: 'NEW VIDEO PREVIEW - DON\'T MISS', platform: 'YouTube', viewers: '185k' },
    { id: 3, name: 'xQc', title: 'TIER LISTS AND DRAMA | 24H STREAM', platform: 'Twitch', viewers: '61.2k' },
    { id: 4, name: 'Trainwreckstv', title: 'GIVEAWAYS AND SLOTS | KICK EXCLUSIVE', platform: 'Kick', viewers: '28.4k' },
  ];

  trendingGames = [
    { id: 'gta-v', name: 'Grand Theft Auto V', viewers: '324k' },
    { id: 'lol', name: 'League of Legends', viewers: '285k' },
    { id: 'valorant', name: 'Valorant', viewers: '212k' },
    { id: 'just-chatting', name: 'Just Chatting', viewers: '198k' },
    { id: 'minecraft', name: 'Minecraft', viewers: '145k' },
  ];

  recentAlerts = [
    { id: 1, type: 'live', icon: 'video', message: 'Pokimane just went live on Twitch!', time: '2 minutes ago' },
    { id: 2, type: 'system', icon: 'heart', message: 'You have 3 new recommended streamers.', time: '1 hour ago' },
    { id: 3, type: 'live', icon: 'video', message: 'Shroud is streaming Valorant now.', time: '4 hours ago' },
    { id: 4, type: 'system', icon: 'settings', message: 'New platform: Kick integration updated.', time: '1 day ago' },
  ];
}
