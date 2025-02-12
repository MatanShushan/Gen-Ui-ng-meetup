export interface ChatMessageInterface {
  id: string;
  actor: 'user' | 'assistant' | 'system';
  component: 'map' | 'text' | 'address-form' | 'product-list' | 'payment';
  message?: string;
  payload: any;
}
