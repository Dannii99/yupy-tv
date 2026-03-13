import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private layoutService = inject(LayoutService);
  isSidebarCollapsed = this.layoutService.isSidebarCollapsed;

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }
}
