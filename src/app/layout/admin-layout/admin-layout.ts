import { ChangeDetectionStrategy, Component, effect, HostListener, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzInputModule,
    NzButtonModule,
    NzDrawerModule,
    NzDropDownModule,
    LucideAngularModule
  ],
  template: `
    <nz-layout class="h-screen overflow-hidden flex flex-row">
      <!-- Sidebar Desktop -->
      @if (!isMobile()) {
        <nz-sider
          class="h-full bg-white border-r border-gray-100 shadow-sm relative z-20"
          nzCollapsible
          [(nzCollapsed)]="isCollapsed"
          [nzTrigger]="null"
          [nzWidth]="260"
          [nzTheme]="'light'"
        >
          <div class="h-16 flex items-center px-6 transition-all duration-300 overflow-hidden border-b border-gray-50">
            <div class="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center flex-none">
              <span class="text-white font-black text-lg italic">Y</span>
            </div>
            <span
              class="ml-3 text-lg font-black text-gray-800 tracking-tight whitespace-nowrap"
              [class.hidden]="isCollapsed()"
            >
              YUPI TV <span class="text-indigo-600">ADMIN</span>
            </span>
          </div>

          <div class="flex flex-col h-[calc(100%-4rem)] justify-between py-4">
            <ul nz-menu nzMode="inline" [nzInlineCollapsed]="isCollapsed()" class="border-none">
              <ng-container *ngTemplateOutlet="menuItems"></ng-container>
            </ul>

            <div class="px-3" [class.px-1]="isCollapsed()">
              <div 
                class="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 transition-all duration-300"
                [class.justify-center]="isCollapsed()"
              >
                <nz-avatar nzIcon="user" class="bg-indigo-100 text-indigo-600 flex-none"></nz-avatar>
                @if (!isCollapsed()) {
                  <div class="overflow-hidden">
                    <p class="m-0 font-bold text-gray-800 truncate text-sm">Super Admin</p>
                    <p class="m-0 text-gray-400 text-xs truncate">admin@yupi.tv</p>
                  </div>
                }
              </div>
            </div>
          </div>
        </nz-sider>
      }

      <!-- Sidebar Mobile (Drawer) -->
      <nz-drawer
        [nzVisible]="isDrawerOpen()"
        nzPlacement="left"
        [nzClosable]="false"
        (nzOnClose)="isDrawerOpen.set(false)"
        [nzWidth]="280"
        [nzBodyStyle]="{ padding: '0' }"
      >
        <ng-container *nzDrawerContent>
          <div class="h-16 flex items-center justify-between px-6 border-b border-gray-50">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-black text-lg italic">Y</span>
              </div>
              <span class="ml-3 text-lg font-black text-gray-800 tracking-tight">YUPI TV <span class="text-indigo-600">ADMIN</span></span>
            </div>
            <button nz-button nzType="text" (click)="isDrawerOpen.set(false)" class="p-0 h-8 w-8 flex items-center justify-center">
              <lucide-icon name="x" class="w-5 h-5 text-gray-400"></lucide-icon>
            </button>
          </div>
          <ul nz-menu nzMode="inline" class="border-none mt-4">
            <ng-container *ngTemplateOutlet="menuItems"></ng-container>
          </ul>
        </ng-container>
      </nz-drawer>

      <!-- Main Content -->
      <nz-layout class="flex-1 flex flex-col h-full bg-gray-50/50">
        <!-- Header -->
        <nz-header class="bg-white/80 backdrop-blur-md px-4 sm:px-8 !flex items-center justify-between border-b border-gray-100 shadow-sm z-30 h-16">
          <div class="flex items-center gap-4">
            <!-- Mobile Menu Toggle -->
            <button
              nz-button
              nzType="text"
              class="lg:hidden h-10 w-10 p-0 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100"
              (click)="isDrawerOpen.set(true)"
            >
              <lucide-icon name="menu" class="w-5 h-5 text-gray-600"></lucide-icon>
            </button>
            
            <!-- Desktop Toggle -->
            <button
              nz-button
              nzType="text"
              class="hidden lg:flex h-10 w-10 p-0 items-center justify-center rounded-xl hover:bg-gray-50"
              (click)="isCollapsed.set(!isCollapsed())"
            >
              <lucide-icon 
                [name]="isCollapsed() ? 'chevron-right' : 'chevron-left'" 
                class="w-5 h-5 text-gray-400"
              ></lucide-icon>
            </button>

            <div class="flex flex-col">
              <h1 class="text-lg sm:text-xl font-black !text-white m-0 leading-tight">
                {{ currentTitle() }}
              </h1>
              <span class="text-xs text-gray-400 font-medium hidden sm:block">¡Bienvenido de nuevo!</span>
            </div>
          </div>

          <div class="flex items-center gap-2 sm:gap-4">
            <div class="hidden md:flex items-center bg-gray-100 rounded-2xl px-3 h-10 border border-transparent focus-within:border-indigo-100 focus-within:bg-white transition-all w-64">
              <lucide-icon name="search" class="w-4 h-4 text-gray-400 flex-none"></lucide-icon>
              <input type="text" placeholder="Buscar streamers..." class="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder:text-gray-400" />
            </div>

            <button nz-button nzType="text" class="h-10 w-10 p-0 flex items-center justify-center rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50">
              <lucide-icon name="settings" class="w-5 h-5"></lucide-icon>
            </button>

            <div 
              nz-dropdown 
              [nzDropdownMenu]="userMenu" 
              nzPlacement="bottomRight"
              class="flex items-center gap-2 cursor-pointer ml-1"
            >
              <nz-avatar 
                [nzSize]="40" 
                nzIcon="user" 
                class="bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 border-2 border-white"
              ></nz-avatar>
            </div>
            
            <nz-dropdown-menu #userMenu="nzDropdownMenu">
              <ul nz-menu class="min-w-[10rem] p-2 rounded-2xl shadow-xl border-none">
                <li nz-menu-item class="rounded-xl py-2 !grid !grid-cols-2 items-center gap-2">
                  <lucide-icon name="user" class="w-4 h-4"></lucide-icon>
                  <p>Mi Perfil</p>
                </li>
                <li nz-menu-item class="rounded-xl py-2 flex items-center gap-2">
                  <lucide-icon name="settings" class="w-4 h-4"></lucide-icon>
                  Ajustes
                </li>
                <li nz-menu-divider></li>
                <li nz-menu-item class="rounded-xl py-2 flex items-center gap-2 text-red-500">
                  <lucide-icon name="log-out" class="w-4 h-4"></lucide-icon>
                  Cerrar Sesión
                </li>
              </ul>
            </nz-dropdown-menu>
          </div>
        </nz-header>

        <!-- Scrollable Content -->
        <nz-content class="flex-1 overflow-y-auto custom-scrollbar">
          <div class="p-4 sm:p-8">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>

    <!-- Menu Template shared between sidebar and drawer -->
    <ng-template #menuItems>
      <li nz-menu-item routerLink="/dashboard" nzMatchRouter (click)="closeDrawerOnNav()">
        <lucide-icon name="layout-dashboard" class="anticon"></lucide-icon>
        <span>Dashboard</span>
      </li>
      <li nz-menu-item routerLink="/streamers" nzMatchRouter (click)="closeDrawerOnNav()">
        <lucide-icon name="video" class="anticon"></lucide-icon>
        <span>Streamers</span>
      </li>
      <li nz-menu-item routerLink="/favorites" nzMatchRouter (click)="closeDrawerOnNav()">
        <lucide-icon name="heart" class="anticon"></lucide-icon>
        <span>Favoritos</span>
      </li>
      <li nz-menu-divider></li>
      <li nz-menu-item routerLink="/settings" nzMatchRouter (click)="closeDrawerOnNav()">
        <lucide-icon name="settings" class="anticon"></lucide-icon>
        <span>Ajustes</span>
      </li>
    </ng-template>
  `,
  styles: `
    :host {
      display: block;
    }
    
    .anticon {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      vertical-align: middle;
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
    }

    ::ng-deep {
      .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
      }
      .ant-menu-inline, .ant-menu-vertical {
        border-right: none !important;
      }
      .ant-menu-item {
        height: 48px !important;
        line-height: 48px !important;
        margin: 4px 12px !important;
        width: calc(100% - 24px) !important;
        border-radius: 12px !important;
        font-weight: 500 !important;
        color: #64748b !important;
        transition: all 0.2s ease-in-out !important;

        &-selected {
          background: #f5f7ff !important;
          color: #4f46e5 !important;
          font-weight: 700 !important;
          &::after {
            display: none !important;
          }
        }
        
        &:hover:not(.ant-menu-item-selected) {
          background: #f8fafc !important;
          color: #4f46e5 !important;
        }
      }
      
      .ant-menu-inline-collapsed .ant-menu-item {
        width: calc(100% - 16px) !important;
        margin: 4px 8px !important;
        padding: 0 16px !important;
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 10px;
        &:hover {
          background: #cbd5e1;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {
  private readonly platformId = inject(PLATFORM_ID);
  
  isCollapsed = signal(false);
  isMobile = signal(false);
  isDrawerOpen = signal(false);
  currentTitle = signal('DASHBOARD');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkBreakpoint();
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.checkBreakpoint();
  }

  private checkBreakpoint(): void {
    const isMobileView = window.innerWidth <= 768;
    this.isMobile.set(isMobileView);
    
    if (isMobileView) {
      this.isCollapsed.set(false);
    } else {
      this.isDrawerOpen.set(false);
    }
  }

  closeDrawerOnNav(): void {
    if (this.isMobile()) {
      this.isDrawerOpen.set(false);
    }
  }
}
