import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <nav class="fixed bottom-0 left-0 z-50 w-full h-20 bg-surface/90 backdrop-blur-xl border-t border-border lg:hidden safe-area-bottom">
      <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        @for (item of navItems; track item.label) {
          <button 
            [routerLink]="item.path"
            routerLinkActive="text-primary"
            [routerLinkActiveOptions]="{ exact: true }"
            class="inline-flex flex-col items-center justify-center px-5 hover:bg-primary/5 transition-all duration-300 group relative"
          >
            <lucide-icon [name]="item.icon" class="w-7 h-7 mb-1 transition-transform group-active:scale-90"></lucide-icon>
            <span class="text-[10px] font-bold uppercase tracking-wider group-active:scale-95 transition-transform">{{ item.label }}</span>
            
            <!-- Active Indicator -->
            <div 
              class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full opacity-0 transition-opacity duration-300"
              [class.opacity-100]="isRouteActive(item.path)"
            ></div>
          </button>
        }
      </div>
    </nav>
  `,
  styles: [`
    .safe-area-bottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavComponent {
  navItems = [
    { label: 'Dash', path: '/dashboard', icon: 'layout-dashboard' },
    { label: 'Games', path: '/games', icon: 'gamepad-2' },
    { label: 'Stream', path: '/streamers', icon: 'video' },
    { label: 'Faves', path: '/favorites', icon: 'heart' },
    { label: 'Set', path: '/settings', icon: 'settings' },
  ];

  // Helper to check active route for the indicator
  isRouteActive(path: string): boolean {
    return window.location.pathname === path;
  }
}
