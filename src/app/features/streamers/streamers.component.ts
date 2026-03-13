import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-streamers',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-8 pb-8 animate-in fade-in duration-500">
      <!-- Header with Filters and Sorting -->
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-text-base tracking-tight mb-2">Explore Streamers</h1>
          <p class="text-text-muted">Discover top content creators across all platforms.</p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <!-- Filter Tabs -->
          <div class="flex p-1 bg-surface border border-border rounded-xl w-full sm:w-auto">
            @for (tab of tabs; track tab) {
              <button 
                (click)="selectedTab.set(tab)"
                class="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                [class.bg-primary]="selectedTab() === tab"
                [class.text-white]="selectedTab() === tab"
                [class.text-text-muted]="selectedTab() !== tab"
                [class.hover:text-text-base]="selectedTab() !== tab"
              >
                {{ tab }}
              </button>
            }
          </div>

          <!-- Sort Control -->
          <div class="flex items-center gap-2 bg-surface border border-border rounded-xl px-3 py-1 h-[46px] w-full sm:w-auto group">
            <span class="text-xs text-text-muted font-medium whitespace-nowrap">Sort by:</span>
            <select 
              (change)="setSort($event)"
              class="bg-transparent text-sm text-text-base font-medium outline-none cursor-pointer pr-2 group-hover:text-primary transition-colors appearance-none"
            >
              @for (option of sortOptions; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
            <lucide-icon name="chevron-right" class="w-4 h-4 text-text-muted rotate-90"></lucide-icon>
          </div>
        </div>
      </header>

      <!-- Streamers Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @for (i of [1,2,3,4,5,6,7,8]; track i) {
          <div 
            [routerLink]="['/stream', i]"
            class="bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 group shadow-lg flex flex-col cursor-pointer"
          >
            <!-- Media Area -->
            <div class="aspect-video bg-background relative overflow-hidden shrink-0 cursor-pointer">
               <!-- Thumbnail Overlay -->
               <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80"></div>
               
               <!-- Live Badge -->
               <div class="absolute top-3 left-3 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg">Live</div>
               
               <!-- Quick Follow Button Overlay -->
               <button 
                 class="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 group/follow shadow-lg"
                 title="Quick Follow"
               >
                 <lucide-icon name="heart" class="w-4 h-4 group-hover/follow:scale-110 group-hover/follow:fill-white transition-all"></lucide-icon>
               </button>

               <!-- Placeholder Avatar -->
               <div class="absolute bottom-3 left-3 flex items-center gap-3">
                 <div class="w-12 h-12 rounded-full border-2 border-primary bg-background shadow-xl flex items-center justify-center relative group-hover:scale-105 transition-transform">
                   <lucide-icon name="user" class="w-6 h-6 text-primary/40"></lucide-icon>
                   <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                 </div>
               </div>
            </div>

            <!-- Content Area -->
            <div class="p-4 flex-1 flex flex-col">
              <div class="flex items-start justify-between mb-1 gap-2">
                <div class="font-bold text-text-base group-hover:text-primary transition-colors line-clamp-1">Streamer Name {{ i }}</div>
                <div class="flex items-center text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded font-bold border border-primary/20 shrink-0">
                  <lucide-icon name="video" class="w-3 h-3 me-1"></lucide-icon>
                  Live
                </div>
              </div>
              <div class="text-xs text-text-muted mb-4 line-clamp-1">Playing Awesome Game Title</div>
              
              <div class="mt-auto flex items-center justify-between pt-3 border-t border-border">
                <div class="flex items-center gap-3">
                  <span class="text-[10px] px-2 py-0.5 bg-background text-text-muted rounded-full border border-border font-medium">Twitch</span>
                  <span class="text-[10px] text-text-muted flex items-center font-medium">
                    <lucide-icon name="users" class="w-3 h-3 me-1"></lucide-icon>
                    1.2k
                  </span>
                </div>
                
                <!-- Main Follow Action -->
                <button class="text-xs font-bold text-primary hover:text-primary/80 transition-all flex items-center gap-1.5 group/btn">
                   <lucide-icon name="heart" class="w-3.5 h-3.5 group-hover/btn:scale-110 group-hover/btn:fill-primary transition-all"></lucide-icon>
                   Follow
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamersComponent {
  tabs = ['All Streams', 'Following', 'Trending'];
  selectedTab = signal('All Streams');

  sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Most Recent', value: 'recent' },
    { label: 'Most Viewed', value: 'viewed' },
  ];
  selectedSort = signal('popular');

  setSort(event: any) {
    this.selectedSort.set(event.target.value);
  }
}
