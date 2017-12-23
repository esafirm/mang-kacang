import Client from '@line/bot-sdk/dist/client';
import { MessageEvent, Message, Group } from '@line/bot-sdk';

export function reply(client: Client, event: MessageEvent, payload: any) {
  return client
    .replyMessage(event.replyToken, payload)
    .catch(error => console.log('LINE ERROR', error));
}

export function push(client: Client, event: MessageEvent, payload: Message) {
  const recipient = getRecipient(event);
  return client
    .pushMessage(recipient, payload)
    .catch(error => console.log('LINE ERROR => ', error));
}

function getRecipient(event: MessageEvent) {
  switch (event.source.type) {
    case 'group':
      return (event.source as Group).groupId;
    case 'user':
      return event.source.userId;
  }
}
