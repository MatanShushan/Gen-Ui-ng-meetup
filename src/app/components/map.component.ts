import { Component, input } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  template: `
    <div class="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <img src="google-map.png" class="mb-5" />
      <p>from : {{ startPoint() }}</p>
      <p>to : {{ endPoint() }}</p>
    </div>
  `,
})
export class MapComponent {
  startPoint = input<string>('Tel aviv');
  endPoint = input<string>('Yavne');
}
