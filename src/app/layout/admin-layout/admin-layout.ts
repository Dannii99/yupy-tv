import { ChangeDetectionStrategy, Component, signal, inject, PLATFORM_ID, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzAvatarModule,
    NzButtonModule,
    NzDropDownModule,
    NzMenuModule,
    NzDrawerModule,
    NzInputModule,
    NzBadgeModule,
    LucideAngularModule
  ],
  template: `
    <nz-layout class="min-h-screen bg-background-dark text-white">
      <!-- Sidebar Desktop -->
      @if (!isMobile() && isInitialized()) {
        <nz-sider
          class="h-screen sticky top-0 bg-background-dark border-r border-border-dark overflow-hidden"
          [nzWidth]="256"
          [nzCollapsed]="isCollapsed()"
          [nzTrigger]="null"
          nzTheme="dark"
        >
          <div class="flex flex-col h-full bg-background-dark">
            <!-- Brand -->
            <div class="p-6 flex items-center gap-3 h-16 shrink-0">
              <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                <lucide-icon name="rocket" class="w-6 h-6"></lucide-icon>
              </div>
              @if (!isCollapsed()) {
                <div class="overflow-hidden whitespace-nowrap">
                  <h1 class="text-lg font-bold leading-none m-0 text-white">StreamAdmin</h1>
                  <p class="text-xs text-slate-400 m-0">Multi-platform Portal</p>
                </div>
              }
            </div>

            <!-- Nav -->
            <nav class="flex-1 mt-4 overflow-y-auto custom-scrollbar">
              <ul nz-menu nzMode="inline" nzTheme="dark" class="bg-transparent border-none">
                <li nz-menu-item routerLink="/dashboard" nzMatchRouter class="!flex !items-center">
                  <lucide-icon name="layout-dashboard" class="anticon"></lucide-icon>
                  <span>Dashboard</span>
                </li>
                <li nz-menu-item routerLink="/analytics" nzMatchRouter class="!flex !items-center">
                  <lucide-icon name="bar-chart-3" class="anticon"></lucide-icon>
                  <span>Analytics</span>
                </li>
                <li nz-menu-item routerLink="/streamers" nzMatchRouter class="!flex !items-center">
                  <lucide-icon name="users" class="anticon"></lucide-icon>
                  <span>Streamers</span>
                </li>
                <li nz-menu-item routerLink="/platforms" nzMatchRouter class="!flex !items-center">
                  <lucide-icon name="tv" class="anticon"></lucide-icon>
                  <span>Platforms</span>
                </li>
                <li nz-menu-item routerLink="/revenue" nzMatchRouter class="!flex !items-center">
                  <lucide-icon name="credit-card" class="anticon"></lucide-icon>
                  <span>Revenue</span>
                </li>
              </ul>
            </nav>

            <!-- Bottom sidebar -->
            <div class="p-4 border-t border-border-dark space-y-1">
              <ul nz-menu nzMode="inline" nzTheme="dark" class="bg-transparent border-none">
                <li nz-menu-item routerLink="/settings" nzMatchRouter class="!flex !items-center">
                  <lucide-icon name="settings" class="anticon"></lucide-icon>
                  <span>Settings</span>
                </li>
              </ul>
              @if (!isCollapsed()) {
                <div class="mt-4 p-3 rounded-xl bg-gradient-to-br from-primary to-purple-700 text-white shadow-lg">
                  <p class="text-xs font-semibold uppercase tracking-wider opacity-80 m-0">Pro Plan</p>
                  <p class="text-sm mt-1 mb-3 leading-tight text-white/90">Unlock advanced multi-stream analytics</p>
                  <button nz-button nzType="default" nzBlock class="!bg-white/20 hover:!bg-white/30 !border-none !text-white !text-xs !font-bold h-9">
                    Upgrade Now
                  </button>
                </div>
              }
            </div>
          </div>
        </nz-sider>
      }

      <nz-layout class="flex-1 flex flex-col min-w-0 bg-background-dark min-h-screen">
        <!-- Header -->
        <nz-header class="!h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 bg-background-dark/90 backdrop-blur-md border-b border-border-dark w-full">
          <div class="flex items-center gap-4 flex-1 max-w-xl">
             @if (isMobile()) {
              <button nz-button nzType="text" (click)="isDrawerOpen.set(true)" class="p-0 h-10 w-10 flex items-center justify-center text-white hover:bg-surface-dark transition-colors">
                <lucide-icon name="menu" class="w-6 h-6"></lucide-icon>
              </button>
            } @else {
              <button nz-button nzType="text" (click)="isCollapsed.set(!isCollapsed())" class="hidden md:flex p-0 h-10 w-10 items-center justify-center text-white hover:bg-surface-dark transition-colors">
                <lucide-icon [name]="isCollapsed() ? 'chevron-right' : 'chevron-left'" class="w-6 h-6"></lucide-icon>
              </button>
            }

            <!-- Search -->
            <div class="relative group flex-1">
              <lucide-icon name="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5"></lucide-icon>
              <input 
                class="w-full bg-surface-dark border-none rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary transition-all text-sm outline-none text-white placeholder:text-slate-500 h-10" 
                placeholder="Search streamers..." 
                type="text"
              />
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button nz-button nzType="text" class="p-2 h-10 w-10 flex items-center justify-center rounded-lg hover:bg-surface-dark text-slate-400 relative border-none cursor-pointer">
              <nz-badge nzStatus="error" [nzOffset]="[0, 5]" class="flex">
                <lucide-icon name="bell" class="w-6 h-6"></lucide-icon>
              </nz-badge>
            </button>
            
            <div class="h-8 w-[1px] bg-border-dark hidden sm:block"></div>
            
            <div class="flex items-center gap-3 pl-2 cursor-pointer group" nz-dropdown [nzDropdownMenu]="userMenu" nzPlacement="bottomRight">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-semibold leading-none m-0 text-white group-hover:text-primary transition-colors">Alex Rivera</p>
                <p class="text-xs text-slate-400 mt-1 m-0">Administrator</p>
              </div>
              <img 
                class="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-all object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWUqTB7AH4N6kAeaCkTGjdhnPZ5QR_YziP1aTo20OpNzwMa49B3IKKqBug2G6_CA75bNygVvuzMfznPdfWsuiBLQSCqDAtgEFlY8t4Yd6bj1KcL2mFyZhLtPgbTkhWfexXQXh-Ac_mHuIn7ioGIIckeYRkMsNoIpgVFWqdJVHNyDkQddcxiv5uoA7fMTwmUQVNgUU9LigMiTHzC8_r97QM2Gubpu45LmwNMqTz5sNhm0CISz8dLXPu5kIKfI5dPJH7ja8Xk7TcldA"
              />
            </div>
            
            <nz-dropdown-menu #userMenu="nzDropdownMenu">
              <ul nz-menu nzTheme="dark" class="min-w-[180px] rounded-xl border-none shadow-2xl bg-surface-dark p-2">
                <li nz-menu-item class="!flex !items-center !gap-3 !py-2 !rounded-lg">
                  <lucide-icon name="user" class="w-4 h-4"></lucide-icon>
                  <span>Profile</span>
                </li>
                <li nz-menu-item class="!flex !items-center !gap-3 !py-2 !rounded-lg">
                  <lucide-icon name="settings" class="w-4 h-4"></lucide-icon>
                  <span>Settings</span>
                </li>
                <li nz-menu-divider class="!my-2 !bg-border-dark"></li >
                <li nz-menu-item class="!flex !items-center !gap-3 !py-2 !rounded-lg !text-red-500 hover:!bg-red-500/10">
                  <lucide-icon name="log-out" class="w-4 h-4"></lucide-icon>
                  <span>Sign Out</span>
                </li>
              </ul>
            </nz-dropdown-menu>
          </div>
        </nz-header>

        <!-- Content Area -->
        <nz-content class="flex-1 overflow-y-auto custom-scrollbar bg-background-dark relative">
          <div class="p-4 md:p-8 min-h-full">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>

    <!-- Mobile Drawer -->
    <nz-drawer
      [nzVisible]="isDrawerOpen()"
      nzPlacement="left"
      [nzClosable]="true"
      (nzOnClose)="isDrawerOpen.set(false)"
      [nzWidth]="280"
      [nzBodyStyle]="{ padding: '0', background: '#170f23' }"
    >
      <ng-container *nzDrawerContent>
        <div class="flex flex-col h-full bg-background-dark text-white">
           <div class="p-6 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
                <lucide-icon name="rocket" class="w-6 h-6"></lucide-icon>
              </div>
              <div>
                <h1 class="text-lg font-bold leading-none m-0 text-white">StreamAdmin</h1>
                <p class="text-xs text-slate-400 m-0">Multi-platform Portal</p>
              </div>
            </div>
            <nav class="flex-1 mt-4">
              <ul nz-menu nzMode="inline" nzTheme="dark" class="bg-transparent border-none">
                <li nz-menu-item routerLink="/dashboard" nzMatchRouter (click)="isDrawerOpen.set(false)" class="!flex !items-center">
                  <lucide-icon name="layout-dashboard" class="anticon"></lucide-icon>
                  <span>Dashboard</span>
                </li>
                <li nz-menu-item routerLink="/analytics" nzMatchRouter (click)="isDrawerOpen.set(false)" class="!flex !items-center">
                  <lucide-icon name="bar-chart-3" class="anticon"></lucide-icon>
                  <span>Analytics</span>
                </li>
              </ul>
            </nav>
        </div>
      </ng-container>
    </nz-drawer>
  `,
  styles: `
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }
    
    .anticon {
      width: 18px;
      height: 18px;
      margin-right: 12px;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
    }

    ::ng-deep {
      .ant-drawer-header {
        background-color: var(--color-background-dark);
        border-bottom: 1px solid var(--color-border-dark);
        .ant-drawer-title { color: white; }
        .ant-drawer-close { color: white; }
      }
      .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  isCollapsed = signal(false);
  isMobile = signal(false);
  isDrawerOpen = signal(false);
  isInitialized = signal(false);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkBreakpoint();
      this.isInitialized.set(true);
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.checkBreakpoint();
  }

  private checkBreakpoint(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const width = window.innerWidth;
    const isMobileView = width < 1024;
    
    if (this.isMobile() !== isMobileView) {
      this.isMobile.set(isMobileView);
    }
    
    if (isMobileView) {
      this.isDrawerOpen.set(false);
    }
  }
}
