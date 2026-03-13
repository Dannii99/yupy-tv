import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface FavoriteStreamer {
  id: string;
  name: string;
  avatar: string;
  platform: 'Twitch' | 'YouTube' | 'Kick';
  isLive: boolean;
  currentGame?: string;
  lastStreamTitle?: string;
  followedSince: string;
  notificationsEnabled: boolean;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-8 pb-28 md:pb-8 animate-in fade-in duration-500">
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-text-base tracking-tight mb-2">Your Favorites</h1>
          <p class="text-text-muted">Manage your followed streamers and notification preferences.</p>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="text-xs text-text-muted bg-surface border border-border px-3 py-1.5 rounded-lg font-medium">
            {{ streamers().length }} Streamers
          </span>
          <button class="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all active:scale-95">
            Add New
          </button>
        </div>
      </header>

      <!-- Favorites List Container -->
      <div class="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
        
        <!-- Table Header (Hidden on Mobile) -->
        <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-background/50 border-b border-border text-[11px] font-bold text-text-muted uppercase tracking-wider">
          <div class="col-span-5">Streamer & Status</div>
          <div class="col-span-3">Followed Since</div>
          <div class="col-span-4 text-right">Actions</div>
        </div>

        <!-- List Items -->
        <div class="divide-y divide-border">
          @for (streamer of streamers(); track streamer.id) {
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-primary/5 transition-all duration-200 group">
              
              <!-- Streamer Info -->
              <div class="col-span-1 md:col-span-5 flex items-center gap-4">
                <div 
                  class="relative shrink-0 cursor-pointer"
                  [routerLink]="['/streamer', streamer.id]"
                >
                  <div class="w-12 h-12 rounded-full border-2 border-border bg-background flex items-center justify-center overflow-hidden shadow-md group-hover:border-primary/50 transition-colors">
                    <lucide-icon name="user" class="w-6 h-6 text-text-muted"></lucide-icon>
                  </div>
                  <!-- Live Status Dot -->
                  <div 
                    class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-surface flex items-center justify-center shadow-lg"
                    [class]="streamer.isLive ? 'bg-red-500' : 'bg-slate-500'"
                  >
                    @if (streamer.isLive) {
                      <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    }
                  </div>
                </div>

                <div class="min-w-0">
                  <div class="flex items-center gap-2 mb-0.5">
                    <span 
                      [routerLink]="['/streamer', streamer.id]"
                      class="font-bold text-text-base group-hover:text-primary transition-colors truncate cursor-pointer"
                    >
                      {{ streamer.name }}
                    </span>
                    <span 
                      class="text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-tighter"
                      [class]="platformStyles[streamer.platform]"
                    >
                      {{ streamer.platform }}
                    </span>
                  </div>
                  <div class="text-xs truncate" [class]="streamer.isLive ? 'text-primary font-medium' : 'text-text-muted'">
                    @if (streamer.isLive) {
                      <span class="flex items-center gap-1">
                         <lucide-icon name="video" class="w-3 h-3"></lucide-icon>
                         Live: {{ streamer.currentGame }}
                      </span>
                    } @else {
                      Last: {{ streamer.lastStreamTitle }}
                    }
                  </div>
                </div>
              </div>

              <!-- Followed Since -->
              <div class="col-span-1 md:col-span-3">
                <div class="md:hidden text-[10px] font-bold text-text-muted uppercase mb-1">Followed Since</div>
                <span class="text-sm text-text-muted font-medium">{{ streamer.followedSince }}</span>
              </div>

              <!-- Actions -->
              <div class="col-span-1 md:col-span-4 flex items-center md:justify-end gap-2">
                <!-- Notification Toggle -->
                <button 
                  (click)="toggleNotifications(streamer)"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl border border-border transition-all duration-200"
                  [class]="streamer.notificationsEnabled ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' : 'bg-background text-text-muted border-border hover:bg-surface hover:text-text-base'"
                  [title]="streamer.notificationsEnabled ? 'Mute notifications' : 'Enable notifications'"
                >
                  <lucide-icon [name]="streamer.notificationsEnabled ? 'bell' : 'bell-off'" class="w-4 h-4"></lucide-icon>
                  <span class="text-xs font-bold hidden xl:block">
                    {{ streamer.notificationsEnabled ? 'Enabled' : 'Muted' }}
                  </span>
                </button>

                <!-- Unfollow Button -->
                <button 
                  (click)="unfollow(streamer.id)"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border text-text-muted hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200"
                  title="Stop following"
                >
                  <lucide-icon name="user-minus" class="w-4 h-4"></lucide-icon>
                  <span class="text-xs font-bold hidden xl:block">Unfollow</span>
                </button>

                <!-- Options Menu Placeholder -->
                <button class="p-2 text-text-muted hover:text-text-base rounded-lg transition-colors">
                  <lucide-icon name="settings" class="w-4 h-4"></lucide-icon>
                </button>
              </div>

            </div>
          } @empty {
            <div class="py-20 text-center animate-in zoom-in-95 duration-300">
               <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                  <lucide-icon name="heart" class="w-10 h-10 text-primary/40"></lucide-icon>
               </div>
               <h3 class="text-xl font-bold text-text-base mb-2">No favorites found</h3>
               <p class="text-text-muted max-w-xs mx-auto text-sm">
                 You haven't added any favorite streamers yet. Start exploring and click the heart icon to manage them here.
               </p>
               <button class="mt-8 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95">
                 Explore Streamers
               </button>
            </div>
          }
        </div>

      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  streamers = signal<FavoriteStreamer[]>([
    {
      id: '1',
      name: 'Ninja',
      avatar: '',
      platform: 'Twitch',
      isLive: true,
      currentGame: 'Fortnite',
      followedSince: 'March 12, 2024',
      notificationsEnabled: true
    },
    {
      id: '2',
      name: 'MrBeast',
      avatar: '',
      platform: 'YouTube',
      isLive: false,
      lastStreamTitle: 'I spent 100 days in a cage',
      followedSince: 'January 05, 2024',
      notificationsEnabled: true
    },
    {
      id: '3',
      name: 'xQc',
      avatar: '',
      platform: 'Twitch',
      isLive: true,
      currentGame: 'Just Chatting',
      followedSince: 'October 15, 2023',
      notificationsEnabled: false
    },
    {
      id: '4',
      name: 'Trainwreckstv',
      avatar: '',
      platform: 'Kick',
      isLive: false,
      lastStreamTitle: '24H SLOTS MARATHON',
      followedSince: 'February 20, 2024',
      notificationsEnabled: false
    },
    {
      id: '5',
      name: 'Shroud',
      avatar: '',
      platform: 'Twitch',
      isLive: true,
      currentGame: 'Valorant',
      followedSince: 'December 10, 2023',
      notificationsEnabled: true
    }
  ]);

  platformStyles = {
    'Twitch': 'bg-[#9146ff]/20 text-[#9146ff] border border-[#9146ff]/30',
    'YouTube': 'bg-[#ff0000]/20 text-[#ff0000] border border-[#ff0000]/30',
    'Kick': 'bg-[#53fc18]/20 text-[#000000] dark:text-[#53fc18] border border-[#53fc18]/30'
  };

  toggleNotifications(streamer: FavoriteStreamer) {
    this.streamers.update(list => 
      list.map(s => s.id === streamer.id ? { ...s, notificationsEnabled: !s.notificationsEnabled } : s)
    );
  }

  unfollow(id: string) {
    this.streamers.update(list => list.filter(s => s.id !== id));
  }
}
