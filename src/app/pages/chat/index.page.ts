import { Component, signal } from '@angular/core';
import { ChatComponent } from '../../components/chat.component';

@Component({
  selector: 'chat-page',
  standalone: true,
  imports: [ChatComponent],
  template: ` <chat /> `,
})
export default class ChatPageComponent {}
