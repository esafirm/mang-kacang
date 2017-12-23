import * as _ from 'lodash';
import Client from '@line/bot-sdk/dist/client';
import { MessageEvent, TextMessage } from '@line/bot-sdk';
import { reply } from './utils';

export function willHandle(event: MessageEvent): Boolean {
  return (event.message as TextMessage).text.toLowerCase().includes('abay');
}

export function handleEvent(client: Client, event: MessageEvent): Promise<any> {
  const abayImage = _.shuffle([
    'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/188503_1601344285846_4341498_n.jpg?oh=522807be30b698fee1f45d3349bd228c&oe=5AD05C5D',
    'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/155936_121730667891072_4752079_n.jpg?oh=26f427c4358edc0d932ef238ee2c186c&oe=5AB8C090'
  ])[0];
  return reply(client, event, {
    type: 'image',
    originalContentUrl: abayImage,
    previewImageUrl: abayImage
  });
}
