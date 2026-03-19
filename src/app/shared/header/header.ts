import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface HeaderMenuItem {
  name: string;
  href?: string;
  active: boolean;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly headerMenuItens = signal<HeaderMenuItem[]>([
    { name: 'Documentation', href: '/documentation', active: false },
    { name: 'WebComponents', href: '/web-components', active: false },
  ]);

  protected onMenuItemClick(item: HeaderMenuItem) {
    this.headerMenuItens.update((items) =>
      items.map((i) => ({ ...i, active: i.name === item.name })),
    );
  }
}
