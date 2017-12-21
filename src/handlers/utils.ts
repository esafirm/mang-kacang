import Client from '@line/bot-sdk/dist/client';
import { MessageEvent } from '@line/bot-sdk';

export function reply(client: Client, event: MessageEvent, payload: any) {
  return client
    .replyMessage(event.replyToken, payload)
    .catch(error => console.log('LINE ERROR', error));
}
