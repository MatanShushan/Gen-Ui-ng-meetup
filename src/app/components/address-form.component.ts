import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { filter, map, Subject } from 'rxjs';
@Component({
  selector: 'address-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-[#374151]">
        Where are you at the moment?
      </h2>
      <form [formGroup]="form">
        <!-- Country -->
        <div class="mb-4">
          <label for="country" class="block text-sm font-medium text-[#374151]"
            >Country</label
          >
          <select
            formControlName="country"
            id="country"
            class="mt-1 block w-full px-3 py-2 border border-[#374151] rounded-lg shadow-sm focus:ring-[#374151] focus:border-[#374151] bg-gray-50 text-[#374151]"
          >
            <option ngValue="" disabled selected>Select your country</option>
            <option ngValue="us">United States</option>
            <option ngValue="ca">Canada</option>
            <option ngValue="uk">United Kingdom</option>
            <option ngValue="israel">Israel</option>
            <!-- Add more options as needed -->
          </select>
        </div>

        <!-- City -->
        <div class="mb-4">
          <label for="city" class="block text-sm font-medium text-[#374151]"
            >City</label
          >
          <input
            formControlName="city"
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            class="mt-1 block w-full px-3 py-2 border border-[#374151] rounded-lg shadow-sm focus:ring-[#374151] focus:border-[#374151] bg-gray-50 text-[#374151]"
          />
        </div>
        <!-- Street -->
        <div class="mb-4">
          <label for="street" class="block text-sm font-medium text-[#374151]"
            >Street</label
          >
          <input
            formControlName="street"
            type="text"
            id="street"
            name="street"
            placeholder="Enter your street address"
            class="mt-1 block w-full px-3 py-2 border border-[#374151] rounded-lg shadow-sm focus:ring-[#374151] focus:border-[#374151] bg-gray-50 text-[#374151]"
          />
        </div>

        <!-- Submit Button -->
        <div>
          <button
            (click)="formSubmit.next(1)"
            class="w-full bg-[#374151] text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800 focus:ring-2 focus:ring-[#374151] focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  `,
})
export class AddressFormComponent {
  form = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
  });

  formSubmit = new Subject();

  userSubmit = outputFromObservable<string>(
    this.formSubmit.pipe(
      filter(() => this.form.valid),
      map((event: any) => {
        const value = this.form.value;
        console.log(value);

        return `Country: ${value.country}, City: ${value.city}, Street: ${value.street}`;
      })
    )
  );
}
