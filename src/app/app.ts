import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
 <app-header [title]="title()"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('collaborative-code-editor');
}
