import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <header>
        <h1 class="text-3xl font-bold text-text-base mb-2">Your Favorites</h1>
        <p class="text-text-muted">Quickly access the creators you love most.</p>
      </header>

      <div class="bg-surface border border-border p-12 rounded-2xl h-[400px] flex items-center justify-center border-dashed">
        <div class="text-center max-w-xs">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <span class="text-primary text-2xl font-bold">♥</span>
          </div>
          <h3 class="text-text-base font-bold mb-2">No favorites yet?</h3>
          <p class="text-text-muted text-sm">Start exploring streamers and click the heart icon to add them here.</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {}
