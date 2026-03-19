import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { getCurrentWindow } from '@tauri-apps/api/window';

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
  private readonly appWindow = this.isTauriRuntime() ? getCurrentWindow() : null;

  protected readonly headerMenuItens = signal<HeaderMenuItem[]>([
    { name: 'Documentation', href: '/documentation', active: false },
    { name: 'WebComponents', href: '/web-components', active: false },
  ]);

  protected onMenuItemClick(item: HeaderMenuItem) {
    this.headerMenuItens.update((items) =>
      items.map((i) => ({ ...i, active: i.name === item.name })),
    );
  }

  protected async minimizeWindow(): Promise<void> {
    if (!this.appWindow) return;
    await this.appWindow.minimize();
  }

  protected async toggleMaximizeWindow(): Promise<void> {
    if (!this.appWindow) return;
    await this.appWindow.toggleMaximize();
  }

  protected async closeWindow(): Promise<void> {
    if (!this.appWindow) return;
    await this.appWindow.close();
  }

  private isTauriRuntime(): boolean {
    return (
      typeof globalThis !== 'undefined' &&
      globalThis.window !== undefined &&
      '__TAURI_INTERNALS__' in globalThis.window
    );
  }
}
