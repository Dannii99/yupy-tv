import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl font-bold text-white mb-2">Welcome back, Alex!</h1>
        <p class="text-slate-400">Here's what's happening with your favorite streamers today.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Stats placeholders -->
        @for (stat of stats; track stat.label) {
          <div class="bg-surface-dark border border-border-dark p-6 rounded-2xl shadow-sm hover:border-primary/50 transition-all group">
            <div class="text-slate-400 text-sm mb-2 group-hover:text-primary transition-colors">{{ stat.label }}</div>
            <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
          </div>
        }
      </div>

      <!-- Content placeholders -->
      <div class="bg-surface-dark border border-border-dark p-8 rounded-2xl h-96 flex items-center justify-center border-dashed">
        <div class="text-center">
          <div class="text-slate-500 mb-2">Dashboard content coming soon</div>
          <p class="text-slate-600 text-sm">We are building something amazing for you.</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  stats = [
    { label: 'Live Now', value: '12' },
    { label: 'Total Favorites', value: '48' },
    { label: 'Hours Watched', value: '124.5' },
    { label: 'New Discoveries', value: '5' },
  ];
}
