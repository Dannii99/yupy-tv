import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface StreamItem {
  id: number;
  streamerName: string;
  streamerAvatar: string;
  title: string;
  viewers: string;
  platform: string;
  thumbnail: string;
  tags: string[];
  following: boolean;
}

interface GameDetail {
  id: string;
  name: string;
  description: string;
  genre: string;
  viewers: string;
  streamsCount: string;
  coverImage: string;
  tags: string[];
}

@Component({
  selector: 'app-trending-game-view',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-8 pb-28 md:pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <!-- Back Button -->
      <button 
        routerLink="/dashboard"
        class="flex items-center text-text-muted hover:text-primary transition-colors font-medium group"
      >
        <lucide-icon name="arrow-left" class="w-4 h-4 me-2 transition-transform group-hover:-translate-x-1"></lucide-icon>
        Back to Dashboard
      </button>

      <!-- Main Game Hero Section -->
      <section class="relative overflow-hidden rounded-3xl border border-border/50 bg-surface shadow-2xl">
        <!-- Hero Background Decor -->
        <div class="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div class="absolute -right-20 -top-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
          <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-surface via-transparent to-surface/80"></div>
        </div>

        <div class="relative z-10 flex flex-col md:flex-row p-6 md:p-10 gap-8 md:items-center">
          <!-- Game Cover -->
          <div class="w-48 h-64 md:w-60 md:h-80 shrink-0 rounded-2xl bg-background overflow-hidden shadow-2xl ring-1 ring-white/10 group">
            <div class="w-full h-full bg-gradient-to-br from-primary/20 to-surface flex items-center justify-center relative">
              <lucide-icon name="gamepad-2" class="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500"></lucide-icon>
              <!-- Image Placeholder Gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <!-- Game Info -->
          <div class="flex-1 space-y-4">
            <div class="flex flex-wrap items-center gap-3">
              <span class="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
                Trending #1
              </span>
              <span class="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full border border-red-500/20 flex items-center">
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full me-2 animate-pulse"></span>
                LIVE
              </span>
            </div>

            <div>
              <h1 class="text-4xl md:text-5xl font-extrabold text-text-base tracking-tight mb-2">{{ game().name }}</h1>
              <p class="text-text-muted text-lg max-w-2xl leading-relaxed">{{ game().description }}</p>
            </div>

            <div class="flex flex-wrap gap-6 text-sm font-medium">
              <div class="flex items-center text-text-base">
                <lucide-icon name="tags" class="w-4 h-4 me-2 text-primary"></lucide-icon>
                {{ game().genre }}
              </div>
              <div class="flex items-center text-text-base">
                <lucide-icon name="users" class="w-4 h-4 me-2 text-primary"></lucide-icon>
                {{ game().viewers }} viewers
              </div>
              <div class="flex items-center text-text-base">
                <lucide-icon name="video" class="w-4 h-4 me-2 text-primary"></lucide-icon>
                {{ game().streamsCount }} live streams
              </div>
            </div>

            <div class="pt-2 flex flex-wrap gap-2">
              @for (tag of game().tags; track tag) {
                <span class="px-3 py-1.5 bg-background border border-border rounded-lg text-xs text-text-muted hover:text-text-base hover:border-primary/40 transition-colors cursor-default">
                  #{{ tag }}
                </span>
              }
            </div>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Live Streams Section (8 cols) -->
        <div class="lg:col-span-8 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-text-base flex items-center">
              <lucide-icon name="play-circle" class="w-6 h-6 text-primary me-3"></lucide-icon>
              Top Live Streams
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-sm text-text-muted">Sort by:</span>
              <select class="bg-surface border border-border rounded-lg text-sm px-3 py-1.5 outline-none focus:border-primary transition-all">
                <option>Viewers (High to Low)</option>
                <option>Recent</option>
                <option>Followed Only</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            @for (stream of liveStreams(); track stream.id) {
              <div 
                [routerLink]="['/stream', stream.id]"
                class="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-all shadow-lg hover:shadow-primary/5 cursor-pointer relative"
              >
                <!-- Thumbnail Area -->
                <div class="aspect-video relative overflow-hidden bg-background">
                  <div class="w-full h-full bg-gradient-to-br from-primary/10 to-surface flex items-center justify-center">
                    <lucide-icon name="video" class="w-10 h-10 text-primary/20 group-hover:scale-110 transition-transform duration-500"></lucide-icon>
                  </div>
                  
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div class="absolute top-3 left-3 flex gap-2">
                    <span class="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">Live</span>
                    <span class="px-2 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium rounded border border-white/10">
                      {{ stream.platform }}
                    </span>
                  </div>
                  
                  <div class="absolute top-3 right-3 flex flex-col items-end gap-2">
                    <span class="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg flex items-center border border-white/5">
                      <lucide-icon name="users" class="w-3 h-3 me-1.5 text-primary"></lucide-icon>
                      {{ stream.viewers }}
                    </span>
                    
                    <!-- Follow Action Button -->
                    <button 
                      (click)="toggleFollow($event, stream)"
                      class="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-lg"
                      [class]="stream.following ? 'bg-primary text-white border-primary' : 'bg-black/40 text-white border-white/20 hover:bg-white/20'"
                      [title]="stream.following ? 'Following' : 'Follow'"
                    >
                      <lucide-icon [name]="stream.following ? 'heart' : 'heart'" [class]="stream.following ? 'fill-current' : ''" class="w-4 h-4"></lucide-icon>
                    </button>
                  </div>
                </div>

                <!-- Info Area -->
                <div class="p-4 space-y-3">
                  <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full border-2 border-primary bg-background p-0.5 overflow-hidden shrink-0 shadow-lg">
                      <div class="w-full h-full bg-primary/10 flex items-center justify-center rounded-full">
                        <lucide-icon name="user" class="w-5 h-5 text-primary"></lucide-icon>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-text-base font-bold text-sm truncate group-hover:text-primary transition-colors leading-tight">
                        {{ stream.title }}
                      </h3>
                      <p class="text-text-muted text-xs mt-1 font-medium">{{ stream.streamerName }}</p>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap gap-1.5">
                    @for (tag of stream.tags; track tag) {
                      <span class="px-2 py-0.5 bg-primary/5 text-primary/80 text-[10px] font-bold rounded uppercase border border-primary/10">
                        {{ tag }}
                      </span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>

          <button class="w-full py-4 border border-border border-dashed rounded-2xl text-text-muted text-sm font-bold hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
            Load More Streams
          </button>
        </div>

        <!-- Secondary Discovery Section (4 cols) -->
        <aside class="lg:col-span-4 space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-text-base flex items-center">
              <lucide-icon name="flame" class="w-5 h-5 text-orange-500 me-2"></lucide-icon>
              More Trending
            </h2>
            <button 
              routerLink="/games"
              class="text-xs text-primary hover:underline font-bold"
            >
              View All
            </button>
          </div>

          <div class="space-y-4">
            @for (otherGame of relatedGames(); track otherGame.id) {
              <div 
                [routerLink]="['/trending-game', otherGame.id]"
                class="flex gap-4 p-3 bg-surface border border-border rounded-xl hover:border-primary/40 transition-all group cursor-pointer shadow-sm"
              >
                <div class="w-16 h-20 rounded-lg bg-background overflow-hidden shrink-0 border border-border shadow-inner group-hover:scale-95 transition-transform duration-300">
                  <div class="w-full h-full bg-gradient-to-br from-primary/5 to-surface flex items-center justify-center">
                    <lucide-icon name="gamepad" class="w-6 h-6 text-primary/20"></lucide-icon>
                  </div>
                </div>
                <div class="flex flex-col justify-center min-w-0">
                  <h4 class="text-text-base font-bold text-sm truncate group-hover:text-primary transition-colors">
                    {{ otherGame.name }}
                  </h4>
                  <div class="flex items-center text-[11px] text-text-muted mt-1 font-medium">
                    <lucide-icon name="users" class="w-3 h-3 me-1"></lucide-icon>
                    {{ otherGame.viewers }} viewers
                  </div>
                  <div class="text-[10px] text-primary font-bold uppercase tracking-wider mt-1.5">
                    {{ otherGame.growth }} growth
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Explore Categories Card -->
          <div class="p-6 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-xl relative overflow-hidden group">
             <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
             <div class="relative z-10">
               <h4 class="font-bold text-lg mb-2">Not your game?</h4>
               <p class="text-white/70 text-xs mb-4 leading-relaxed">Discover hundreds of other categories and genres tailored to your taste.</p>
               <button 
                routerLink="/games"
                class="w-full py-2 bg-white text-primary rounded-xl text-xs font-bold hover:shadow-lg transition-all active:scale-95"
               >
                Explore Categories
               </button>
             </div>
          </div>
        </aside>

      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingGameViewComponent {
  private route = inject(ActivatedRoute);

  gameId = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  game = signal<GameDetail>({
    id: 'gta-v',
    name: 'Grand Theft Auto V',
    description: 'When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.',
    genre: 'Action, Open World',
    viewers: '324,512',
    streamsCount: '1,420',
    coverImage: '',
    tags: ['Sandbox', 'Crime', 'Multiplayer', 'Roleplay', 'Heist']
  });

  liveStreams = signal<StreamItem[]>([
    {
      id: 1,
      streamerName: 'GamerLegend_99',
      streamerAvatar: '',
      title: 'GTA V NOPIXEL ROLEPLAY! | NEW CHARACTER | !VPN',
      viewers: '12.4k',
      platform: 'Twitch',
      thumbnail: '',
      tags: ['Roleplay', 'NoPixel', 'English'],
      following: false
    },
    {
      id: 2,
      streamerName: 'Speedy_ Gonzales',
      streamerAvatar: '',
      title: 'CASINO HEIST SPEEDRUN! | WORLD RECORD ATTEMPT',
      viewers: '8.2k',
      platform: 'YouTube',
      thumbnail: '',
      tags: ['Speedrun', 'Heist', 'Challenge'],
      following: true
    },
    {
      id: 3,
      streamerName: 'Detective_Ray',
      streamerAvatar: '',
      title: 'COP RP ON PUBLIC SERVER | CHASE MODE ON',
      viewers: '5.1k',
      platform: 'Twitch',
      thumbnail: '',
      tags: ['Roleplay', 'Police', 'Funny'],
      following: false
    },
    {
      id: 4,
      streamerName: 'ChaosQueen',
      streamerAvatar: '',
      title: 'GTA ONLINE WITH SUBS! | SURVIVAL MODE',
      viewers: '3.7k',
      platform: 'Kick',
      thumbnail: '',
      tags: ['Multiplayer', 'Survival', 'SubGames'],
      following: false
    }
  ]);

  relatedGames = signal([
    { id: 'lol', name: 'League of Legends', viewers: '285k', growth: '+12%' },
    { id: 'valorant', name: 'Valorant', viewers: '212k', growth: '+5%' },
    { id: 'just-chatting', name: 'Just Chatting', viewers: '198k', growth: '+2%' },
    { id: 'minecraft', name: 'Minecraft', viewers: '145k', growth: '+8%' },
    { id: 'cs2', name: 'Counter-Strike 2', viewers: '128k', growth: '+15%' }
  ]);

  toggleFollow(event: Event, stream: StreamItem) {
    event.preventDefault();
    event.stopPropagation();
    
    this.liveStreams.update(streams => 
      streams.map(s => s.id === stream.id ? { ...s, following: !s.following } : s)
    );
  }
}
