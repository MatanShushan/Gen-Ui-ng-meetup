import { Component, computed, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, map, Subject } from 'rxjs';

@Component({
  selector: 'payment-form',
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="max-w-fit mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg px-14	"
    >
      <section class="bg-gray-50 antialiased">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mx-auto max-w-5xl">
            <h2 class="text-xl font-semibold text-[#374151] sm:text-2xl">
              Payment
            </h2>

            <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form
                [formGroup]="form"
                class="w-full rounded-lg border border-[#374151] bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div class="mb-6 grid grid-cols-2 gap-4">
                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="full_name"
                      class="mb-2 block text-sm font-medium text-[#374151]"
                      >Full name (as displayed on card)*</label
                    >
                    <input
                      formControlName="full_name"
                      type="text"
                      id="full_name"
                      class="block w-full rounded-lg border border-[#374151] bg-gray-50 p-2.5 text-sm text-[#374151] focus:border-[#374151] focus:ring-[#374151]"
                      placeholder="Bonnie Green"
                    />
                  </div>

                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="card-number-input"
                      class="mb-2 block text-sm font-medium text-[#374151]"
                      >Card number*</label
                    >
                    <input
                      formControlName="card_number"
                      type="text"
                      id="card-number-input"
                      class="block w-full rounded-lg border border-[#374151] bg-gray-50 p-2.5 text-sm text-[#374151] focus:border-[#374151] focus:ring-[#374151]"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    />
                  </div>

                  <div>
                    <label
                      for="card-expiration-input"
                      class="mb-2 block text-sm font-medium text-[#374151]"
                      >Card expiration*</label
                    >
                    <input
                      formControlName="card_expiration"
                      id="card-expiration-input"
                      type="text"
                      class="block w-full rounded-lg border border-[#374151] bg-gray-50 p-2.5 text-sm text-[#374151] focus:border-[#374151] focus:ring-[#374151]"
                      placeholder="MM/YY"
                    />
                  </div>

                  <div>
                    <label
                      for="cvv-input"
                      class="mb-2 block text-sm font-medium text-[#374151]"
                      >CVV*</label
                    >
                    <input
                      formControlName="cvv"
                      type="number"
                      id="cvv-input"
                      class="block w-full rounded-lg border border-[#374151] bg-gray-50 p-2.5 text-sm text-[#374151] focus:border-[#374151] focus:ring-[#374151]"
                      placeholder="•••"
                    />
                  </div>
                </div>

                <button
                  (click)="formSubmit.next(1)"
                  class="flex w-full items-center justify-center rounded-lg bg-[#374151] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500"
                >
                  Pay now
                </button>
              </form>

              <div class="mt-6 grow sm:mt-8 lg:mt-0">
                <div
                  class="space-y-4 rounded-lg border border-[#374151] bg-gray-50 p-6"
                >
                  <div class="space-y-2">
                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-[#374151]">
                        Original price
                      </dt>
                      <dd class="text-base font-medium text-[#374151]">
                        {{ price() + '$' }}
                      </dd>
                    </dl>

                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal text-[#374151]">Tax</dt>
                      <dd class="text-base font-medium text-[#374151]">
                        {{ tax() + '$' }}
                      </dd>
                    </dl>
                  </div>

                  <dl
                    class="flex items-center justify-between gap-4 border-t border-[#374151] pt-2"
                  >
                    <dt class="text-base font-bold text-[#374151]">Total</dt>
                    <dd class="text-base font-bold text-[#374151]">
                      {{ totalPrice() + '$' }}
                    </dd>
                  </dl>
                </div>

                <div class="mt-6 flex items-center justify-center gap-8">
                  <img
                    class="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                    alt="PayPal"
                  />
                  <img
                    class="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt="Visa"
                  />
                  <img
                    class="h-8 w-auto"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt="Mastercard"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class CreditCardComponent {
  form = new FormGroup({
    full_name: new FormControl(''),
    card_number: new FormControl(''),
    card_expiration: new FormControl(''),
    cvv: new FormControl(''),
  });

  price = input<number>(100);
  tax = computed(() => this.price() * 0.17);
  totalPrice = computed(() => this.price() + this.tax());

  formSubmit = new Subject();

  userSubmit = outputFromObservable<string>(
    this.formSubmit.pipe(
      map((event: any) => {
        const value = this.form.value;
        console.log({ value, event });

        return `Full name: ${value.full_name}, Card number: ${value.card_number}, Card expiration: ${value.card_expiration}, CVV: ${value.cvv}`;
      })
    )
  );
}
