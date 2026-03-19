import { Component, signal } from '@angular/core';

interface SidebarMenuItem {
  name: string;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly sidebarMainMenuItens = signal<SidebarMenuItem[]>([
    { name: 'Collection', icon: 'folder', active: true },
    { name: 'History', icon: 'clock-counter-clockwise', active: false },
  ]);

  protected toggleActive(item: SidebarMenuItem): void {
    this.sidebarMainMenuItens.update((items) =>
      items.map((i) => ({
        ...i,
        active: i.name === item.name ? !i.active : false,
      })),
    );
  }
}
