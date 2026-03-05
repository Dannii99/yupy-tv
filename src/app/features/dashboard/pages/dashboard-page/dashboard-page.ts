import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LucideAngularModule } from 'lucide-angular';

interface StreamerMock {
  id: string;
  name: string;
  platform: 'twitch' | 'youtube' | 'kick';
  viewers: number;
  status: 'online' | 'offline';
  thumbnail: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzStatisticModule,
    NzSkeletonModule,
    NzEmptyModule,
    NzTagModule,
    NzButtonModule,
    LucideAngularModule
  ],
  template: `
    <div class="space-y-8">
      <!-- Stats Row -->
      <div nz-row [nzGutter]="[24, 24]">
        <div nz-col nzXs="24" nzSm="12" nzLg="6">
          <nz-card class="shadow-sm border-none rounded-xl p-4">
            <nz-statistic
              [nzValue]="5"
              [nzTitle]="'Streamers Online'"
              [nzPrefix]="prefixOnline"
              [nzValueStyle]="{ color: '#10b981' }"
            ></nz-statistic>
            <ng-template #prefixOnline>
              <lucide-icon name="bar-chart-3" class="w-5 h-5 mr-2 text-emerald-500"></lucide-icon>
            </ng-template>
          </nz-card>
        </div>
        <div nz-col nzXs="24" nzSm="12" nzLg="6">
          <nz-card class="shadow-sm border-none rounded-xl p-4">
            <nz-statistic
              [nzValue]="12400"
              [nzTitle]="'Total Viewers'"
              [nzPrefix]="prefixViewers"
            ></nz-statistic>
            <ng-template #prefixViewers>
              <lucide-icon name="users" class="w-5 h-5 mr-2 text-indigo-500"></lucide-icon>
            </ng-template>
          </nz-card>
        </div>
        <div nz-col nzXs="24" nzSm="12" nzLg="6">
          <nz-card class="shadow-sm border-none rounded-xl p-4">
            <nz-statistic
              [nzValue]="12"
              [nzTitle]="'Favoritos'"
              [nzPrefix]="prefixFavs"
              [nzValueStyle]="{ color: '#f43f5e' }"
            ></nz-statistic>
            <ng-template #prefixFavs>
              <lucide-icon name="heart" class="w-5 h-5 mr-2 text-rose-500"></lucide-icon>
            </ng-template>
          </nz-card>
        </div>
        <div nz-col nzXs="24" nzSm="12" nzLg="6">
          <nz-card class="shadow-sm border-none rounded-xl p-4">
            <nz-statistic
              [nzValue]="85"
              [nzTitle]="'Health Score'"
              [nzPrefix]="prefixHealth"
              [nzSuffix]="'%'"
            ></nz-statistic>
            <ng-template #prefixHealth>
              <lucide-icon name="circle-check" class="w-5 h-5 mr-2 text-blue-500"></lucide-icon>
            </ng-template>
          </nz-card>
        </div>
      </div>

      <!-- Main Section -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-800 m-0">Streamers Destacados</h3>
          <button nz-button nzType="link" class="text-indigo-600 font-medium p-0">Ver todos</button>
        </div>

        <!-- Loading State -->
        @if (isLoading()) {
          <div nz-row [nzGutter]="[24, 24]">
            @for (i of [1,2,3,4]; track i) {
              <div nz-col nzXs="24" nzSm="12" nzLg="6">
                <nz-card class="shadow-sm border-none rounded-xl overflow-hidden">
                  <nz-skeleton [nzActive]="true" [nzParagraph]="{ rows: 3 }"></nz-skeleton>
                </nz-card>
              </div>
            }
          </div>
        } @else {
          <!-- Empty State -->
          @if (streamers().length === 0) {
            <nz-card class="shadow-sm border-none rounded-xl py-12">
              <nz-empty nzNotFoundImage="simple" nzNotFoundContent="No hay streamers activos ahora"></nz-empty>
            </nz-card>
          } @else {
            <!-- Data Grid -->
            <div nz-row [nzGutter]="[24, 24]">
              @for (streamer of streamers(); track streamer.id) {
                <div nz-col nzXs="24" nzSm="12" nzLg="6">
                  <nz-card
                    nzHoverable
                    [nzBodyStyle]="{ padding: '0' }"
                    class="shadow-sm border-none rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <!-- Thumbnail Placeholder -->
                    <div class="aspect-video bg-gray-200 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <nz-tag [nzColor]="'red'" class="absolute top-3 left-3 border-none font-bold uppercase text-[10px]">LIVE</nz-tag>
                      <span class="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center">
                        <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
                        {{ streamer.viewers | number }} viewers
                      </span>
                    </div>

                    <div class="p-4">
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-gray-800 text-base truncate">{{ streamer.name }}</span>
                        @switch (streamer.platform) {
                          @case ('twitch') { <span nz-icon nzType="twitch" class="text-purple-600 text-lg"></span> }
                          @case ('youtube') { <span nz-icon nzType="youtube" class="text-red-600 text-lg"></span> }
                          @case ('kick') { <span class="bg-green-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded leading-none">K</span> }
                        }
                      </div>
                      <p class="text-gray-500 text-sm mb-4 truncate">Streaming some content here...</p>
                      <button nz-button nzBlock class="rounded-lg border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-medium">
                        Ver Stream
                      </button>
                    </div>
                  </nz-card>
                </div>
              }
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  isLoading = signal(true);
  streamers = signal<StreamerMock[]>([]);

  ngOnInit(): void {
    // Mock loading
    setTimeout(() => {
      this.streamers.set([
        { id: '1', name: 'Ibai', platform: 'twitch', viewers: 85000, status: 'online', thumbnail: '' },
        { id: '2', name: 'AuronPlay', platform: 'twitch', viewers: 45000, status: 'online', thumbnail: '' },
        { id: '3', name: 'ElRubius', platform: 'twitch', viewers: 32000, status: 'online', thumbnail: '' },
        { id: '4', name: 'WestCOL', platform: 'kick', viewers: 25000, status: 'online', thumbnail: '' },
      ]);
      this.isLoading.set(false);
    }, 1500);
  }
}
