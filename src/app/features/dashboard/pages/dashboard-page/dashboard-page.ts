import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzCarouselModule,
    NzTabsModule,
    NzAvatarModule,
    NzSkeletonModule,
    LucideAngularModule
  ],
  template: `
    <div class="space-y-8 bg-background-dark text-white min-h-full">
      <!-- Filters & Quick Stats -->
      <div nz-row [nzGutter]="[32, 32]">
        <div nz-col nzXs="24" nzLg="16" class="space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold tracking-tight m-0 text-white">Overview</h2>
            
            <div class="flex gap-2 p-1 bg-surface-dark rounded-xl">
              <button nz-button nzType="text" class="!px-4 !py-1.5 !rounded-lg !bg-background-dark !shadow-sm !text-sm !font-medium !text-primary !border-none !h-auto">All</button>
              <button nz-button nzType="text" class="!px-4 !py-1.5 !rounded-lg hover:!bg-background-dark !text-sm !font-medium !text-slate-400 !transition-all !border-none !h-auto">Twitch</button>
              <button nz-button nzType="text" class="!px-4 !py-1.5 !rounded-lg hover:!bg-background-dark !text-sm !font-medium !text-slate-400 !transition-all !border-none !h-auto">YouTube</button>
              <button nz-button nzType="text" class="!px-4 !py-1.5 !rounded-lg hover:!bg-background-dark !text-sm !font-medium !text-slate-400 !transition-all !border-none !h-auto">Kick</button>
            </div>
          </div>

          <!-- Quick Stats Cards -->
          <div nz-row [nzGutter]="[24, 24]">
            @if (isLoading()) {
              @for (i of [1,2,3]; track i) {
                <div nz-col nzXs="24" nzMd="8">
                  <nz-card class="!p-6 !bg-surface-dark !border-border-dark">
                    <nz-skeleton [nzActive]="true" [nzParagraph]="{ rows: 2 }" [nzTitle]="false"></nz-skeleton>
                  </nz-card>
                </div>
              }
            } @else {
              <div nz-col nzXs="24" nzMd="8">
                <nz-card class="!p-6 !bg-surface-dark !border-border-dark">
                  <div class="flex items-center justify-between mb-4">
                    <div class="p-2 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center">
                      <lucide-icon name="radio" class="w-5 h-5"></lucide-icon>
                    </div>
                    <span class="text-xs font-bold text-green-500">+12%</span>
                  </div>
                  <p class="text-slate-400 text-sm font-medium m-0">Total Live</p>
                  <h3 class="text-3xl font-bold mt-1 m-0 text-white">1,284</h3>
                </nz-card>
              </div>
              <div nz-col nzXs="24" nzMd="8">
                <nz-card class="!p-6 !bg-surface-dark !border-border-dark">
                  <div class="flex items-center justify-between mb-4">
                    <div class="p-2 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <lucide-icon name="user-plus" class="w-5 h-5"></lucide-icon>
                    </div>
                    <span class="text-xs font-bold text-primary">+5.4%</span>
                  </div>
                  <p class="text-slate-400 text-sm font-medium m-0">New Followers</p>
                  <h3 class="text-3xl font-bold mt-1 m-0 text-white">42.5k</h3>
                </nz-card>
              </div>
              <div nz-col nzXs="24" nzMd="8">
                <nz-card class="!p-6 !bg-surface-dark !border-border-dark">
                  <div class="flex items-center justify-between mb-4">
                    <div class="p-2 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                      <lucide-icon name="clock" class="w-5 h-5"></lucide-icon>
                    </div>
                    <span class="text-xs font-bold text-blue-500">+2.1%</span>
                  </div>
                  <p class="text-slate-400 text-sm font-medium m-0">Hours Watched</p>
                  <h3 class="text-3xl font-bold mt-1 m-0 text-white">8.9M</h3>
                </nz-card>
              </div>
            }
          </div>
        </div>

        <!-- Featured Carousel -->
        <div nz-col nzXs="24" nzLg="8">
          <h2 class="text-lg font-bold mb-4 m-0 text-white">Featured Streamers</h2>
          <div class="min-h-[220px] relative">
            @if (isLoading()) {
              <nz-card class="h-[220px] !bg-surface-dark !border-border-dark flex items-center justify-center">
                <nz-skeleton [nzActive]="true" [nzParagraph]="{ rows: 3 }"></nz-skeleton>
              </nz-card>
            } @else {
              <nz-carousel nzAutoPlay class="rounded-2xl overflow-hidden shadow-xl border border-border-dark h-[220px]">
                <div nz-carousel-content class="relative h-[220px]">
                  <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFULjhF2hL3szd-6brjKOoDO3XBBNWeadlIu7-zQkKymlj_EN6zkO-FzflQzxfM5ZPbV1zva5Xovs_vUURmjGuecWSzqNLYg41pU_N8iLXq89mTxVRt60YrGCtJ5r1nOSF2SwwYtajEXk0n6-hLIkbrshJkwIty2k4s409qfOF-OwQTPkTpeBbe6HSonreSxT1I4V4ARGvfHnjIJ6_UERrkBiAm7kpzOEnUsEX1KmB3HX7d2h6nnikM_-Bx32qMyJEXlAu5nwsDiI" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span class="inline-flex items-center px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white mb-2 w-fit uppercase">Featured</span>
                    <h4 class="text-xl font-bold text-white m-0">Valkyrae LIVE</h4>
                    <p class="text-slate-300 text-sm m-0">Playing Variety Games</p>
                  </div>
                </div>
              </nz-carousel>
            }
          </div>
        </div>
      </div>

      <!-- Live Now Grid -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold tracking-tight m-0 text-white">Live Now</h2>
            <span class="px-2 py-1 rounded bg-red-500/20 text-red-500 text-xs font-bold animate-pulse">2,342 STREAMS</span>
          </div>
          <button nz-button nzType="link" class="!text-primary !font-semibold !text-sm hover:!underline p-0">View All</button>
        </div>

        <div nz-row [nzGutter]="[24, 24]">
          @if (isLoading()) {
            @for (i of [1,2,3,4]; track i) {
              <div nz-col nzXs="24" nzSm="12" nzLg="6">
                <nz-card class="!bg-surface-dark !border-border-dark overflow-hidden">
                  <nz-skeleton [nzActive]="true" [nzAvatar]="true" [nzParagraph]="{ rows: 2 }"></nz-skeleton>
                </nz-card>
              </div>
            }
          } @else {
            @for (stream of liveStreams(); track stream.id) {
              <div nz-col nzXs="24" nzSm="12" nzLg="6">
                <nz-card
                  nzHoverable
                  [nzBodyStyle]="{ padding: '0' }"
                  class="!rounded-2xl !bg-surface-dark !border-border-dark group hover:!border-primary/50 !transition-all overflow-hidden"
                >
                  <div class="relative aspect-video overflow-hidden">
                    <img [src]="stream.thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-white text-[10px] font-bold flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> {{ stream.viewers }}
                    </div>
                    <div class="absolute top-2 right-2 p-1 bg-background-dark/80 backdrop-blur-md rounded-lg shadow-lg flex items-center justify-center">
                      @if (stream.platform === 'twitch') {
                        <svg class="w-4 h-4 text-[#9146FF]" fill="currentColor" viewbox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57V4.714zm4.715 0H18v5.143h-1.714V4.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0H6zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714v9.429z"></path></svg>
                      } @else if (stream.platform === 'youtube') {
                        <svg class="w-4 h-4 text-[#FF0000]" fill="currentColor" viewbox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>
                      } @else {
                        <div class="w-4 h-4 bg-[#53FC18] rounded-sm flex items-center justify-center font-black text-[8px] text-black">K</div>
                      }
                    </div>
                  </div>
                  <div class="p-4 flex gap-3">
                    <nz-avatar [nzSrc]="stream.avatar" class="!border !border-border-dark flex-none"></nz-avatar>
                    <div class="min-w-0">
                      <h4 class="font-bold text-sm truncate m-0 text-white">{{ stream.title }}</h4>
                      <p class="text-xs text-slate-400 truncate m-0">{{ stream.streamer }} • {{ stream.category }}</p>
                    </div>
                  </div>
                </nz-card>
              </div>
            }
          }
        </div>
      </section>

      <!-- Trending & Alerts -->
      <div nz-row [nzGutter]="[32, 32]">
        <div nz-col nzXs="24" nzLg="12">
          <nz-card class="!bg-surface-dark !border-border-dark">
             <h3 class="font-bold mb-4 flex items-center gap-2 m-0 text-base text-white">
                <lucide-icon name="trending-up" class="w-5 h-5 text-primary"></lucide-icon>
                Trending Games
            </h3>
            @if (isLoading()) {
              <nz-skeleton [nzActive]="true" [nzParagraph]="{ rows: 3 }"></nz-skeleton>
            } @else {
              <div class="space-y-4 text-white">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-16 bg-background-dark rounded-lg overflow-hidden shrink-0">
                      <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIXw1jxogsHnEJBYp71ByhJAKvIx4ICVyxFpqOeD6eblYb9ZCZMWWikIIEiU4xhqgBf6CLl9ZOfHEYtj9QxzBigV7xOPL7sfw34N72KkpGIriMCGCMu9UBFuC8XeJDxFUJradM18nYugTm8aZ-ZOgKIeVNyRysr-d6VlXMQ2rA3DZ5E900RGMwXtC1LJ7LGjFnpYtWzerNKFvc5VGwwLibL0le_73bdndwTQVsAfqVkkGnqLpR_7tl9zVOpVWq6GNetAKwTXCpb6k" />
                    </div>
                    <div>
                      <p class="text-sm font-bold m-0 text-white">Just Chatting</p>
                      <p class="text-xs text-slate-400 m-0">452K Viewers</p>
                    </div>
                  </div>
                  <span class="text-xs font-semibold text-green-500">High Growth</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-16 bg-background-dark rounded-lg overflow-hidden shrink-0">
                      <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBKmIZMqXG2AVfoBtGe5PRi2oQ92f1CMMBU9DImzla31cfc_PFWnNNhE1qJXhNHVfGQraiLw6gBmyM-hn4NN04WU6hLwTakRSPHPpyPgk2n7Ais-U7u8o3Qd7rc3IbjhCA7v1rK3h1JW4NE6urC2_22Ca6G92ujYpyQZf1Y4A1wTKsKEAoHTP-Wq87n48DCOKOtvkmib8Bwq8k5oz7atGeaN06jie4zJpOneyK9dOXTbx9pF6G0_ZyEbF0rxcJiv8452Q8qqZkTt8" />
                    </div>
                    <div>
                      <p class="text-sm font-bold m-0 text-white">Counter-Strike 2</p>
                      <p class="text-xs text-slate-400 m-0">289K Viewers</p>
                    </div>
                  </div>
                  <span class="text-xs font-semibold text-slate-500">Stable</span>
                </div>
              </div>
            }
          </nz-card>
        </div>

        <div nz-col nzXs="24" nzLg="12">
          <nz-card class="!bg-surface-dark !border-border-dark">
            <h3 class="font-bold mb-4 flex items-center gap-2 m-0 text-base text-white">
                <lucide-icon name="bell-ring" class="w-5 h-5 text-primary"></lucide-icon>
                Recent Alerts
            </h3>
            @if (isLoading()) {
              <nz-skeleton [nzActive]="true" [nzParagraph]="{ rows: 2 }"></nz-skeleton>
            } @else {
              <div class="space-y-4">
                <div class="flex items-start gap-3 p-3 rounded-xl bg-background-dark/50 border border-border-dark">
                  <div class="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    <lucide-icon name="alert-triangle" class="w-4 h-4"></lucide-icon>
                  </div>
                  <div>
                    <p class="text-xs font-bold m-0 text-white">System Alert</p>
                    <p class="text-[11px] text-slate-400 m-0 leading-tight">Twitch API latency is currently higher than normal in EU-West.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-3 rounded-xl bg-background-dark/50 border border-border-dark">
                  <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <lucide-icon name="info" class="w-4 h-4"></lucide-icon>
                  </div>
                  <div>
                    <p class="text-xs font-bold m-0 text-white">Feature Update</p>
                    <p class="text-[11px] text-slate-400 m-0 leading-tight">Kick multi-chat integration is now available for all pro users.</p>
                  </div>
                </div>
              </div>
            }
          </nz-card>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    
    ::ng-deep {
      .ant-carousel .slick-dots li button {
        @apply bg-slate-700 w-2 h-2 rounded-full opacity-100;
      }
      .ant-carousel .slick-dots li.slick-active button {
        @apply bg-primary w-2 h-2;
      }
      .ant-skeleton-content .ant-skeleton-title, .ant-skeleton-content .ant-skeleton-paragraph > li {
        @apply bg-slate-700/50;
      }
      .ant-skeleton-header .ant-skeleton-avatar {
        @apply bg-slate-700/50;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  isLoading = signal(true);
  liveStreams = signal<any[]>([]);

  ngOnInit(): void {
    // Simulamos carga de datos
    setTimeout(() => {
      this.liveStreams.set([
        {
          id: '1',
          title: 'Ninja Weekly Cup',
          streamer: 'Ninja',
          category: 'Fortnite',
          viewers: '12.4K',
          platform: 'twitch',
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcTS-TooMbrEbm7_wqgnMMElBohtFeEKz4ES4ccxBxwe3mENGn3-doEfsQquWwsgFkzT0bwuV1GlGGPSP-hI3qftk9NtkRliY5xaWTGRrxZSkXv0ZOZxn5f7CoJtm1H9t4ehDJEkLb4-i5_JJnabfn03YkPjwf84kRtl9LG6fqRECV0OaMD5Zhv_M-hYkqnbBApqKyMSMKG1Zas8dDGik7T5XH7G5i3j5-yurmdyRj20bX5ikI3eAvk8C89aFIrM-7gyu9cHbLZHI',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAOkq1IjLE2V9xv3D3LgOAVLFlwZscSHNogPKRedgCaejdiVnbl7H4FtpqlyN1t3AUxIE2YNllOb6kM6q23hUeBja2RZTnb_0MeJ5DHeTwMFUhyEi8kTkV6nEX4kzacmhY_gpQzgndaeewQimRDlBx8vzUL1NsUvI84ivTgyWHgdic75G7dE3nitBe5-hU--sEe_DhvUGQbdn9yHKLDSyUoQrx3czpy8WI4SzgzykYkSDmk2lQHd-seU8D0kOClEQ3BXPFVtph6P0'
        },
        {
          id: '2',
          title: 'Cozy Art Stream & Chill',
          streamer: 'Pokimane',
          category: 'Just Chatting',
          viewers: '8.9K',
          platform: 'youtube',
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsNksBrI-zaI6RGse7I6Sk7X4bl3V_KT4liJ_vNedTt0zOr89eU9OKiUJ7tSw13M04u5kriYGa-XptQveDem6psQdlFNbjA5sz-03CaLZKvfD6Mgz5L19Lj_M-KnNB7duklvMVI-UPclmhrS6-tRhRNJxaYYIyJmrOwaTRsUUsngW6h2c07y_zEuZyuzSP30wjn62ZMqxxBwsBjgR46v70pY3w144PKlBRfJwxfJbvjyELk96wHJbDLRyuoFq0I67L5sIxANkxMtU',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC71Z33uZBDsgUixH6AWBsO0rvlAJIVCBvdMpZ4umKnSGSkl4o-Wmav2JX9nbRnkF3vjoD9oHgpyWA0Sa5rchnGBET3ubslWgcai4NLjD_5ylQx8CxIyVh69Rt9g11nyTPFgiUsYsLxAklcanz1Ex0DruW7ofxb4EGajDUCgah3CoarhxKnNefIOVgAzhtosvMbU_iGbNpQE0TGoBg75rkouftryevOiYJm95zy36gq2gtiu7r4xBzM4OCpB5R2aubWbHwb_uyy1hk'
        },
        {
          id: '3',
          title: 'IRL TOKYO NIGHTS',
          streamer: 'xQc',
          category: 'IRL',
          viewers: '34.2K',
          platform: 'kick',
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRnqKOCTPbLG28iLRwJq6Zfp_0H-a9_-xJblzGwalbV9ZU8MubVbyKyBgdV5oSu2fvLJUGRMxoorV3PvXRqp5nlGOaCIfXmYXWMwJPXk5hAd3z2gvHCSHyjxd7mA6scKvSGvsQOTdaXuQhcpxZtJW0WMer2g7yWFxB-O9ak5DG7wciGXDa3ge5esHNeqGNCbsQyFbngwllszqpINfso4Tmb0HXKWQXpVqTpbE_uaUGhcLtfdjU-tUNv9AEGWuJhzDC6RH8_QD7C70',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiureWIWfiu-XCwgC37KN7oeA8EueOiiH3uFIN9G0XVzDRjkeDT7bH0QI5hqsDxMK74gI6CILukd2tDNlpt1kmKIrxWj2vypE7I2zAzXms5-i0HxfRuIQvJtmDYg77IKGFaEa3ekqQXa6WukPIHqF9-ajCwNkPzqZiZhgeh6y-660X-IKIkff4a1hdkdAFguuDL4F0Gu3xMOzPmgT7NmhSQl0FlxlIXQc83rmkwMM52G_LMPpyY3Q1XVJddnsd97DNh3tNtIU1X4k'
        },
        {
          id: '4',
          title: 'Valorant Ranked Grind',
          streamer: 'Kyedae',
          category: 'Valorant',
          viewers: '5.1K',
          platform: 'twitch',
          thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwhDP77CbeqlEbQp7BWvXQ8y7K1nt_uOjw9XDZ3HFTTUIZpn7f8hJpAvgbFqSyGqroaIGAvoIeBkgeCsqr82A5LgYs5mFPCYZK2I-cjt8kcU5UbT2fTW-cxNMlhiM3UsuriPIDLZr7e1A9uNo2CyZcmP6VQ7yWA27ZKz5XoZJdTUhfLJp3JUhHzytE06MjvekBKkcNZa22NwKw8hK7OxS9YkpxXAxpCEzb5WREK5Sm3hxjFQzDRBJJ4cD_PjJBvkhBfjk_F0-3eV8',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT28zDeXH_LjpbV-6H7KRottWjq4vh6Y6z7ud2m-Pyt4tcBAgxeSLJ8ly6mPtBj9Bt42uOl1yHIt3w5P-m3NNHX3qboXLfFh3CtH85UUu775HX-h6DVur7eCsOp-nIrekK8K1xTy35md4203SpdYv3FJQ98y-KUsHUs2lloLVjgKNzpUeQW7gClbGGUQKPbc8acQPD5NOJjNEV6d59r5iR2AnDF5No92-3_8u8-Vt7vCQTUW807GMsJsGIrY0Cso-uzLTSyLu5mKk'
        }
      ]);
      this.isLoading.set(false);
    }, 1500);
  }
}
