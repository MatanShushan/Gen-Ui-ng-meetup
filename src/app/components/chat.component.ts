import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChatMessageInterface } from '../../shared-models/chat.interface';
import { ProductListComponent } from './product-list.component';
import { CreditCardComponent } from './payment.component';
import { AddressFormComponent } from './address-form.component';
import { MapComponent } from './map.component';

@Component({
  selector: 'chat',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProductListComponent,
    CreditCardComponent,
    AddressFormComponent,
    MapComponent,
  ],
  template: `
    <div class="mx-12	p-6  shadow-lg rounded-lg">
      <!-- Heading -->
      <div class="flex flex-col space-y-1.5 pb-6">
        <p class="text-sm text-white leading-3">
          Personal assistant in my shop
        </p>
      </div>

      <!-- Chat Container -->
      <div
        class="flex flex-col justify-between
 pr-4 h-[80vh] "
      >
        <div class="overflow-auto	">
          <!--  User Chat Message -->
          @for(msg of chatMessages(); track msg.id ){

          <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span
              class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8"
            >
              <div class="rounded-full bg-gray-100 border p-1">
                @if(msg.actor === 'user'){
                <svg
                  stroke="none"
                  fill="black"
                  stroke-width="0"
                  viewBox="0 0 16 16"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
                  ></path>
                </svg>
                } @else {
                <svg
                  stroke="none"
                  fill="black"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  ></path>
                </svg>
                }
              </div>
            </span>
            <div class="flex flex-col w-full">
              <p class="leading-relaxed text-white">
                <span class="block font-bold text-white"
                  >{{ msg.actor | uppercase }} </span
                >{{ msg.message }}
              </p>
              <div class="align-center ">
                @switch (msg.component) { 
                  @case('map'){

                <app-map
                  [startPoint]="msg.payload.startPoint"
                  [endPoint]="msg.payload.endPoint"
                />
                } @case('address-form'){
                <address-form (userSubmit)="userSubmit($event)"></address-form>

                } @case('payment'){
                <payment-form
                  (userSubmit)="userSubmit($event)"
                  [price]="msg.payload.price"
                />

                } @case('product-list'){
                <product-list
                  (userSubmit)="userSubmit($event)"
                  [products]="msg.payload.products"
                />

                } 
              }
              </div>
            </div>
          </div>

          }
        </div>

        <!-- Input box  -->
        <div class="flex items-center pt-0">
          <input
            (keydown.enter)="submitMsg()"
            [formControl]="input"
            class="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-white focus-visible:ring-offset-2"
            placeholder="Type your message"
            value=""
          />
          <button
            (click)="submitMsg()"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ChatComponent {
  input = new FormControl('');
  http = inject(HttpClient);

  chatMessages: WritableSignal<ChatMessageInterface[]> = signal([
    {
      id: '1',
      actor: 'assistant',
      component: 'text',
      message: 'Hi, how can I help you today?',
      payload: {},
    },
  ]);
  responseMessage: string = '';

  ngOnInit() {}

  userSubmit(event: string) {
    this.submitMsg(event);
  }

  submitMsg(submitedText?: string) {
    const msg = submitedText || this.input.value;
    this.input.setValue('');

    this.chatMessages.update((prev) => {
      return [
        ...prev,
        {
          id: '2',
          actor: 'user',
          component: 'text',
          message: msg,
          payload: {},
        } as ChatMessageInterface,
      ];
    });
    return this.http
      .post<ChatMessageInterface>('/api/v1/chat', {
        messages: this.chatMessages(),
      })
      .subscribe((res) => {
        this.chatMessages.update((prev) => {
          return [...prev, res as ChatMessageInterface];
        });
      });
  }
}
