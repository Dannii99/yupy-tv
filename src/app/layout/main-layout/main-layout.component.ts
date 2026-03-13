import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    NzLayoutModule, 
    SidebarComponent, 
    HeaderComponent,
    BottomNavComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private layoutService = inject(LayoutService);
  isSidebarCollapsed = this.layoutService.isSidebarCollapsed;
}
