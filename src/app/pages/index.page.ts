import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: ``,
})
export default class HomeComponent {
  router = inject(Router);
  constructor() {
    this.router.navigate(['home']);
  }
}
