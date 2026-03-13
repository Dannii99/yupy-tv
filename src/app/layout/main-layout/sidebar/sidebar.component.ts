import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private layoutService = inject(LayoutService);
  isCollapsed = this.layoutService.isSidebarCollapsed;

  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'layout-dashboard' },
    { label: 'Streamers', path: '/streamers', icon: 'video' },
    { label: 'Favorites', path: '/favorites', icon: 'heart' },
    { label: 'Settings', path: '/settings', icon: 'settings' },
  ];
}
