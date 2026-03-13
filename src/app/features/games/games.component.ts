import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface GameItem {
  id: string;
  name: string;
  genre: string;
  viewers: string;
  liveStreams: string;
  isTrending: boolean;
  isPopular: boolean;
  coverImage: string;
}

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="space-y-8 pb-28 md:pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <!-- Page Header -->
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="text-4xl font-extrabold text-text-base tracking-tight mb-2">Explore Games</h1>
          <p class="text-text-muted text-lg">Discover the most popular categories and live experiences across all platforms.</p>
        </div>
        
        <div class="flex items-center gap-4 bg-surface border border-border p-1.5 rounded-2xl shadow-sm self-start md:self-auto">
          <div class="flex items-center px-4 py-2 text-primary font-bold text-sm bg-primary/10 rounded-xl border border-primary/20">
            <lucide-icon name="video" class="w-4 h-4 me-2"></lucide-icon>
            1,240 Games Live
          </div>
          <div class="h-6 w-px bg-border"></div>
          <div class="flex items-center px-4 py-2 text-text-muted font-bold text-sm">
            <lucide-icon name="trending-up" class="w-4 h-4 me-2"></lucide-icon>
            Trending Now
          </div>
        </div>
      </header>

      <!-- Search & Filters -->
      <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <!-- Filter Tabs -->
        <div class="flex p-1.5 bg-surface border border-border rounded-2xl w-full lg:w-auto overflow-x-auto scrollbar-hide">
          @for (filter of filterOptions; track filter) {
            <button 
              (click)="selectedFilter.set(filter)"
              class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap"
              [class.bg-primary]="selectedFilter() === filter"
              [class.text-white]="selectedFilter() === filter"
              [class.shadow-lg]="selectedFilter() === filter"
              [class.shadow-primary/20]="selectedFilter() === filter"
              [class.text-text-muted]="selectedFilter() !== filter"
              [class.hover:text-text-base]="selectedFilter() !== filter"
            >
              {{ filter }}
            </button>
          }
        </div>

        <!-- Sort & Search -->
        <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div class="relative flex-1 sm:w-64">
            <lucide-icon name="search" class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"></lucide-icon>
            <input 
              type="text" 
              placeholder="Search games..." 
              (input)="searchQuery.set($any($event.target).value)"
              class="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-2xl text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-text-muted/60"
            >
          </div>
          
          <div class="flex items-center gap-2 bg-surface border border-border px-4 py-3 rounded-2xl shadow-sm">
            <span class="text-xs text-text-muted font-bold uppercase tracking-wider">Sort:</span>
            <select 
              (change)="sortBy.set($any($event.target).value)"
              class="bg-transparent text-sm font-bold text-text-base outline-none cursor-pointer focus:text-primary transition-colors"
            >
              <option value="popular">Most Popular</option>
              <option value="viewers">Most Viewed</option>
              <option value="active">Most Active</option>
              <option value="az">A-Z</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Games Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        @for (game of filteredGames(); track game.id) {
          <div 
            [routerLink]="['/trending-game', game.id]"
            class="group relative bg-surface border border-border rounded-2xl p-2.5 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer overflow-hidden"
          >
            <!-- Game Cover -->
            <div class="aspect-[3/4] rounded-xl bg-background mb-4 overflow-hidden relative shadow-inner ring-1 ring-white/5">
              <div class="w-full h-full bg-gradient-to-br from-primary/10 to-surface flex items-center justify-center relative">
                 <lucide-icon name="gamepad-2" class="w-12 h-12 text-primary/20 group-hover:scale-110 transition-transform duration-700"></lucide-icon>
                 
                 <!-- Hover Overlay -->
                 <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div class="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                      <lucide-icon name="play" class="w-6 h-6 fill-current"></lucide-icon>
                    </div>
                 </div>
              </div>

              <!-- Badges -->
              <div class="absolute top-2 left-2 flex flex-col gap-1.5">
                @if (game.isTrending) {
                  <span class="px-2 py-0.5 bg-orange-500 text-white text-[9px] font-black rounded uppercase tracking-tighter shadow-lg flex items-center">
                    <lucide-icon name="flame" class="w-2.5 h-2.5 me-1"></lucide-icon>
                    Trending
                  </span>
                }
                @if (game.isPopular) {
                  <span class="px-2 py-0.5 bg-primary text-white text-[9px] font-black rounded uppercase tracking-tighter shadow-lg">
                    Popular
                  </span>
                }
              </div>
            </div>

            <!-- Game Info -->
            <div class="space-y-1.5 px-1 pb-1">
              <h3 class="font-bold text-text-base text-sm leading-tight truncate group-hover:text-primary transition-colors">
                {{ game.name }}
              </h3>
              <div class="flex items-center text-[11px] text-text-muted font-medium">
                <span class="truncate">{{ game.genre }}</span>
              </div>
              
              <div class="pt-2 flex items-center justify-between">
                <div class="flex items-center text-[10px] font-bold text-text-base">
                  <lucide-icon name="users" class="w-3 h-3 me-1 text-primary"></lucide-icon>
                  {{ game.viewers }}
                </div>
                <div class="flex items-center text-[10px] font-bold text-primary/80">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500 me-1.5 animate-pulse"></span>
                  {{ game.liveStreams }}
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Empty State -->
      @if (filteredGames().length === 0) {
        <div class="py-20 flex flex-col items-center justify-center bg-surface border border-border border-dashed rounded-3xl animate-in zoom-in-95 duration-500">
          <div class="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
            <lucide-icon name="search-x" class="w-10 h-10 text-primary/40"></lucide-icon>
          </div>
          <h3 class="text-xl font-bold text-text-base mb-2">No games found</h3>
          <p class="text-text-muted">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            (click)="resetFilters()"
            class="mt-6 px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all active:scale-95"
          >
            Clear all filters
          </button>
        </div>
      }

      <!-- Pagination/Load More Placeholder -->
      @if (filteredGames().length > 0) {
        <div class="flex justify-center pt-8">
          <button class="px-8 py-3 bg-surface border border-border rounded-2xl text-text-muted font-bold text-sm hover:text-primary hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/5 flex items-center">
            <lucide-icon name="plus" class="w-4 h-4 me-2"></lucide-icon>
            Load More Games
          </button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent {
  filterOptions = ['All Games', 'Trending', 'Popular', 'New Releases', 'Esports'];
  selectedFilter = signal('All Games');
  searchQuery = signal('');
  sortBy = signal('popular');

  games = signal<GameItem[]>([
    { id: 'gta-v', name: 'Grand Theft Auto V', genre: 'Action, RPG', viewers: '324k', liveStreams: '1.4k', isTrending: true, isPopular: true, coverImage: '' },
    { id: 'lol', name: 'League of Legends', genre: 'MOBA', viewers: '285k', liveStreams: '2.1k', isTrending: false, isPopular: true, coverImage: '' },
    { id: 'valorant', name: 'Valorant', genre: 'Shooter, Tactical', viewers: '212k', liveStreams: '1.8k', isTrending: true, isPopular: true, coverImage: '' },
    { id: 'just-chatting', name: 'Just Chatting', genre: 'IRL', viewers: '198k', liveStreams: '4.2k', isTrending: false, isPopular: true, coverImage: '' },
    { id: 'minecraft', name: 'Minecraft', genre: 'Sandbox, Survival', viewers: '145k', liveStreams: '3.5k', isTrending: false, isPopular: true, coverImage: '' },
    { id: 'cs2', name: 'Counter-Strike 2', genre: 'Shooter, Tactical', viewers: '128k', liveStreams: '940', isTrending: true, isPopular: true, coverImage: '' },
    { id: 'fortnite', name: 'Fortnite', genre: 'Battle Royale', viewers: '115k', liveStreams: '2.8k', isTrending: false, isPopular: true, coverImage: '' },
    { id: 'dota2', name: 'Dota 2', genre: 'MOBA', viewers: '95k', liveStreams: '620', isTrending: false, isPopular: false, coverImage: '' },
    { id: 'apex', name: 'Apex Legends', genre: 'Battle Royale', viewers: '88k', liveStreams: '1.2k', isTrending: true, isPopular: false, coverImage: '' },
    { id: 'wow', name: 'World of Warcraft', genre: 'MMORPG', viewers: '72k', liveStreams: '480', isTrending: false, isPopular: true, coverImage: '' },
    { id: 'tarkov', name: 'Escape from Tarkov', genre: 'Shooter, Extraction', viewers: '65k', liveStreams: '310', isTrending: true, isPopular: false, coverImage: '' },
    { id: 'elden-ring', name: 'Elden Ring', genre: 'Action, RPG', viewers: '58k', liveStreams: '215', isTrending: false, isPopular: false, coverImage: '' },
    { id: 'fifa-24', name: 'EA Sports FC 24', genre: 'Sports', viewers: '52k', liveStreams: '890', isTrending: false, isPopular: false, coverImage: '' },
    { id: 'overwatch2', name: 'Overwatch 2', genre: 'Shooter, Team', viewers: '48k', liveStreams: '740', isTrending: false, isPopular: false, coverImage: '' },
    { id: 'roblox', name: 'Roblox', genre: 'Sandbox', viewers: '45k', liveStreams: '1.1k', isTrending: false, isPopular: false, coverImage: '' },
    { id: 'chess', name: 'Chess', genre: 'Strategy', viewers: '38k', liveStreams: '120', isTrending: true, isPopular: false, coverImage: '' },
    { id: 'hearthstone', name: 'Hearthstone', genre: 'Card Game', viewers: '32k', liveStreams: '85', isTrending: false, isPopular: false, coverImage: '' },
    { id: 'stardew', name: 'Stardew Valley', genre: 'Simulation', viewers: '28k', liveStreams: '150', isTrending: false, isPopular: false, coverImage: '' },
  ]);

  filteredGames = computed(() => {
    let result = this.games();
    
    // Search
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      result = result.filter(g => g.name.toLowerCase().includes(query) || g.genre.toLowerCase().includes(query));
    }
    
    // Filter
    if (this.selectedFilter() !== 'All Games') {
      const filter = this.selectedFilter();
      if (filter === 'Trending') result = result.filter(g => g.isTrending);
      if (filter === 'Popular') result = result.filter(g => g.isPopular);
      // New Releases / Esports could use specific mock data if expanded
    }
    
    // Sort
    const sort = this.sortBy();
    result = [...result].sort((a, b) => {
      if (sort === 'viewers') return parseInt(b.viewers) - parseInt(a.viewers);
      if (sort === 'az') return a.name.localeCompare(b.name);
      if (sort === 'active') return parseFloat(b.liveStreams) - parseFloat(a.liveStreams);
      return 0; // default (popular)
    });
    
    return result;
  });

  resetFilters() {
    this.searchQuery.set('');
    this.selectedFilter.set('All Games');
    this.sortBy.set('popular');
  }
}
