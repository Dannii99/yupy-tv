import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface StreamerProfile {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  platform: 'Twitch' | 'YouTube' | 'Kick';
  bio: string;
  followers: string;
  totalViews: string;
  isLive: boolean;
  status: 'Live' | 'Offline';
  currentGame?: string;
  streamTitle?: string;
  socials: { icon: string; link: string }[];
}

interface ActivityItem {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  viewers?: string;
  duration?: string;
  type: 'stream' | 'clip';
}

@Component({
  selector: 'app-streamer-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="animate-in fade-in duration-700 pb-28 lg:pb-20">
      
      <!-- Profile Header / Banner Area -->
      <section class="relative">
        <!-- Banner -->
        <div class="relative -top-[1.5rem] -left-[1.5rem] w-[calc(100%+3rem)] md:-left-[0.75rem] md:w-[calc(100%+1.5rem)] h-56 md:h-80 rounded-b-[2.5rem] md:rounded-b-[4rem] bg-gradient-to-br from-primary via-purple-600 to-indigo-900 overflow-hidden shadow-2xl">
           <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
           <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
           
           <!-- Decorative shapes -->
           <div class="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
           <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        </div>

        <!-- Profile Info Overlap -->
        <div class="max-w-7xl mx-auto px-6 md:px-12 -mt-20 md:-mt-24 relative z-10">
           <div class="flex flex-col md:flex-row items-end md:items-center gap-6 md:gap-8">
              <!-- Avatar -->
              <div class="relative group">
                <div class="w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] md:rounded-[3.5rem] bg-surface p-1.5 shadow-2xl ring-4 ring-black/10">
                   <div class="w-full h-full rounded-[2.2rem] md:rounded-[3.2rem] bg-background flex items-center justify-center overflow-hidden border-2 border-primary/20">
                      <lucide-icon name="user" class="w-16 h-16 md:w-24 md:h-24 text-primary/40 group-hover:scale-110 transition-transform duration-500"></lucide-icon>
                   </div>
                </div>
                <!-- Verification Badge -->
                <div class="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-surface shadow-xl">
                   <lucide-icon name="check" class="w-4 h-4 md:w-5 md:h-5 font-black"></lucide-icon>
                </div>
                <!-- Live Pulse -->
                @if (profile().isLive) {
                  <div class="absolute -top-2 -left-2 px-3 py-1 bg-red-600 text-white text-[10px] md:text-xs font-black rounded-xl uppercase tracking-widest shadow-xl flex items-center gap-2 border-2 border-surface animate-bounce">
                    <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Live
                  </div>
                }
              </div>

              <!-- Basic Info -->
              <div class="flex-1 space-y-3 pb-2 w-full md:w-auto text-center md:text-left">
                 <div class="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-center md:justify-start">
                    <h1 class="text-3xl md:text-5xl font-black text-text-base tracking-tight drop-shadow-sm">{{ profile().name }}</h1>
                    <div 
                      class="self-center md:self-auto px-3 py-1 rounded-xl text-xs font-black uppercase tracking-widest border shadow-sm"
                      [class]="platformStyles[profile().platform]"
                    >
                      {{ profile().platform }}
                    </div>
                 </div>
                 <p class="text-sm md:text-base text-text-muted font-medium max-w-2xl leading-relaxed mx-auto md:mx-0">
                    {{ profile().bio }}
                 </p>
                 
                 <!-- Social Links -->
                 <div class="flex items-center justify-center md:justify-start gap-3 pt-1">
                    @for (social of profile().socials; track social.link) {
                      <a [href]="social.link" class="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 hover:shadow-lg transition-all">
                        <lucide-icon [name]="social.icon" class="w-5 h-5"></lucide-icon>
                      </a>
                    }
                 </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                 <button class="flex-1 md:flex-none px-8 py-4 bg-primary text-white font-black rounded-[1.25rem] flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95 text-sm uppercase tracking-wider">
                    <lucide-icon name="heart" class="w-5 h-5 fill-white"></lucide-icon>
                    Follow
                 </button>
                 <button class="p-4 bg-surface border border-border text-text-muted hover:text-text-base rounded-[1.25rem] transition-all shadow-md group">
                    <lucide-icon name="bell" class="w-5 h-5 group-hover:rotate-12 transition-transform"></lucide-icon>
                 </button>
                 <button class="p-4 bg-surface border border-border text-text-muted hover:text-text-base rounded-[1.25rem] transition-all shadow-md">
                    <lucide-icon name="more-horizontal" class="w-5 h-5"></lucide-icon>
                 </button>
              </div>
           </div>
        </div>
      </section>

      <!-- Content Grid -->
      <main class="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Column: Stats & About -->
        <aside class="lg:col-span-4 space-y-8">
           
           <!-- Quick Stats -->
           <div class="bg-surface border border-border rounded-[2.5rem] p-8 shadow-xl space-y-8 relative overflow-hidden">
              <div class="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
              
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 relative z-10">
                 <div class="space-y-1">
                    <div class="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Followers</div>
                    <div class="text-2xl md:text-3xl font-black text-text-base">{{ profile().followers }}</div>
                 </div>
                 <div class="space-y-1">
                    <div class="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Total Views</div>
                    <div class="text-2xl md:text-3xl font-black text-text-base">{{ profile().totalViews }}</div>
                 </div>
              </div>

              <div class="pt-6 border-t border-border/50 relative z-10">
                 <div class="flex items-center justify-between mb-4">
                    <span class="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Current Status</span>
                    <span 
                      class="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border"
                      [class]="profile().isLive ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'"
                    >
                      {{ profile().status }}
                    </span>
                 </div>
                 
                 @if (profile().isLive) {
                   <div class="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <div class="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Streaming Now</div>
                      <div class="font-bold text-text-base text-sm mb-1 leading-tight">{{ profile().streamTitle }}</div>
                      <div class="text-xs text-text-muted flex items-center gap-1.5">
                        <lucide-icon name="gamepad-2" class="w-3.5 h-3.5"></lucide-icon>
                        {{ profile().currentGame }}
                      </div>
                      <button 
                        [routerLink]="['/stream', profile().id]"
                        class="w-full mt-4 py-2 bg-primary text-white text-xs font-black rounded-xl uppercase tracking-widest hover:shadow-lg transition-all"
                      >
                        Watch Stream
                      </button>
                   </div>
                 } @else {
                   <div class="p-4 bg-background/50 rounded-2xl border border-border text-center">
                      <lucide-icon name="calendar" class="w-6 h-6 text-text-muted mx-auto mb-2 opacity-40"></lucide-icon>
                      <div class="text-xs font-bold text-text-muted">Last live 2 days ago</div>
                   </div>
                 }
              </div>
           </div>

           <!-- Achievements / Tags -->
           <div class="bg-surface border border-border rounded-[2.5rem] p-8 shadow-xl">
              <h3 class="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-6">Profile Tags</h3>
              <div class="flex flex-wrap gap-2">
                 @for (tag of ['Partner', 'Pro Gamer', 'Speedrunner', 'Variety']; track tag) {
                   <span class="px-4 py-2 bg-background border border-border text-text-base text-xs font-bold rounded-xl hover:border-primary/40 transition-colors cursor-default">
                     #{{ tag }}
                   </span>
                 }
              </div>
           </div>
        </aside>

        <!-- Right Column: Latest Content -->
        <div class="lg:col-span-8 space-y-12">
           
           <!-- Latest Streams -->
           <section class="space-y-6">
              <div class="flex items-center justify-between">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                      <lucide-icon name="play-circle" class="w-6 h-6"></lucide-icon>
                    </div>
                    <h3 class="text-2xl font-black text-text-base tracking-tight">Recent Streams</h3>
                 </div>
                 <button class="text-sm font-bold text-text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                    View Archive
                    <lucide-icon name="chevron-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></lucide-icon>
                 </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 @for (item of recentStreams(); track item.id) {
                   <div class="bg-surface border border-border rounded-3xl overflow-hidden group hover:border-primary/40 transition-all shadow-xl cursor-pointer">
                      <div class="aspect-video bg-background relative overflow-hidden">
                         <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                         <div class="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md text-[10px] font-black text-white rounded-lg border border-white/10">{{ item.duration }}</div>
                         <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div class="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                              <lucide-icon name="play" class="w-7 h-7 text-white fill-white"></lucide-icon>
                            </div>
                         </div>
                      </div>
                      <div class="p-6 space-y-3">
                         <div class="text-base font-black text-text-base line-clamp-1 group-hover:text-primary transition-colors">{{ item.title }}</div>
                         <div class="flex items-center justify-between text-[11px] text-text-muted font-black uppercase tracking-widest">
                            <span class="flex items-center gap-2">
                               <lucide-icon name="users" class="w-3.5 h-3.5"></lucide-icon> 
                               {{ item.viewers }} peak
                            </span>
                            <span>{{ item.date }}</span>
                         </div>
                      </div>
                   </div>
                 }
              </div>
           </section>

           <!-- Popular Clips -->
           <section class="space-y-6">
              <div class="flex items-center justify-between">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-inner">
                      <lucide-icon name="zap" class="w-6 h-6"></lucide-icon>
                    </div>
                    <h3 class="text-2xl font-black text-text-base tracking-tight">Popular Clips</h3>
                 </div>
                 <button class="text-sm font-bold text-text-muted hover:text-primary transition-colors">View All Clips</button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 @for (clip of popularClips(); track clip.id) {
                   <div class="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/40 transition-all shadow-lg cursor-pointer">
                      <div class="aspect-video bg-background relative overflow-hidden">
                         <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                         <div class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-md text-[9px] font-black text-white rounded-md border border-white/10">0:30</div>
                      </div>
                      <div class="p-4">
                         <div class="text-xs font-bold text-text-base truncate group-hover:text-primary transition-colors">{{ clip.title }}</div>
                         <div class="mt-1 text-[10px] text-text-muted font-bold">{{ clip.viewers }} views</div>
                      </div>
                   </div>
                 }
              </div>
           </section>

        </div>
      </main>

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamerProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  
  profile = signal<StreamerProfile>({
    id: '1',
    name: 'Ninja',
    avatar: '',
    banner: '',
    platform: 'Twitch',
    bio: 'Professional gamer and content creator. Best known for Fortnite. Catch me live every day!',
    followers: '18.4M',
    totalViews: '542M',
    isLive: true,
    status: 'Live',
    currentGame: 'Fortnite',
    streamTitle: 'FORTNITE RANKED GRINDING! | !sub !discord',
    socials: [
      { icon: 'twitter', link: '#' },
      { icon: 'youtube', link: '#' },
      { icon: 'instagram', link: '#' },
      { icon: 'globe', link: '#' }
    ]
  });

  recentStreams = signal<ActivityItem[]>([
    { id: 's1', title: 'Fortnite Chill Streams with Friends!', thumbnail: '', date: '2 days ago', viewers: '42.5k', duration: '6h 12m', type: 'stream' },
    { id: 's2', title: 'Tournament Practice - No Mistakes Allowed', thumbnail: '', date: '4 days ago', viewers: '38.2k', duration: '8h 45m', type: 'stream' },
  ]);

  popularClips = signal<ActivityItem[]>([
    { id: 'c1', title: 'Insane 360 Headshot', thumbnail: '', date: '1 week ago', viewers: '245k', type: 'clip' },
    { id: 'c2', title: 'Ninja reacts to new update', thumbnail: '', date: '2 weeks ago', viewers: '182k', type: 'clip' },
    { id: 'c3', title: 'Wait for it...', thumbnail: '', date: '1 month ago', viewers: '156k', type: 'clip' },
  ]);

  platformStyles = {
    'Twitch': 'bg-[#9146ff]/10 text-[#9146ff] border-[#9146ff]/20',
    'YouTube': 'bg-[#ff0000]/10 text-[#ff0000] border-[#ff0000]/20',
    'Kick': 'bg-[#53fc18]/10 text-[#000000] dark:text-[#53fc18] border-[#53fc18]/20'
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // In a real app, fetch profile data by ID
      // For now we use Ninja as default
    }
  }
}
