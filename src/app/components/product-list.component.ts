import { Component, input, output } from '@angular/core';

interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
  category?: string;
}

@Component({
  selector: 'product-list',
  imports: [],
  template: `
    <div class="max-w-fit	 mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 lg:max-w-7xl ">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h2>

          <div
            class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            @for(product of products(); track product.id){
            <div class="group relative" (click)="selectProduct(product)">
              <img
                [src]="product.img"
                class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      {{ product.title }}
                  </h3>
                </div>
                <p class="text-sm font-medium text-gray-900">
                  {{ product.price + '$' }}
                </p>
              </div>
            </div>

            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductListComponent {
  products = input<Array<Product>>([]);
  userSubmit = output<string>();

  selectProduct(product: Product) {
    this.userSubmit.emit(
      'Selected the product: ' +
        product.title +
        ' with the price of ' +
        product.price +
        '$' +
        'proceed to payment'
    );
  }
}
