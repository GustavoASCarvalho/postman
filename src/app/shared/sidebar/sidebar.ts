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
  protected readonly sidebarMenuItens = signal<SidebarMenuItem[]>([
    { name: 'Collection', icon: 'folder', active: false },
    { name: 'History', icon: 'history', active: false },
  ]);

  protected toggleActive(item: SidebarMenuItem): void {
    this.sidebarMenuItens.update((items) =>
      items.map((i) => ({
        ...i,
        active: i.name === item.name ? !i.active : false,
      })),
    );
  }
}
