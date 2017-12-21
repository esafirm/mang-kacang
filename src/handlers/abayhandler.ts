import Client from '@line/bot-sdk/dist/client';
import { MessageEvent, TextMessage } from '@line/bot-sdk';
import { reply } from './utils';

export function willHandle(event: MessageEvent): Boolean {
  return (event.message as TextMessage).text.toLowerCase().includes('abay');
}

export function handleEvent(client: Client, event: MessageEvent): Promise<any> {
  const abayImage =
    'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/188503_1601344285846_4341498_n.jpg?oh=522807be30b698fee1f45d3349bd228c&oe=5AD05C5D';
  return reply(client, event, {
    type: 'image',
    originalContentUrl: abayImage,
    previewImageUrl: abayImage
  });
}
