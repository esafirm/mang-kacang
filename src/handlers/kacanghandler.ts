import Client from '@line/bot-sdk/dist/client';
import { MessageEvent, TextMessage, Group } from '@line/bot-sdk';
import { reply } from './utils';

const WAITING_TIME = 60 * 1000;
const taskMap = new Map();

export function willHandle(event: MessageEvent) {
  return event.source.type === 'group';
}

export function handleEvent(client: Client, event: MessageEvent) {
  const textMessage: string = (event.message as TextMessage).text;
  const groupId: string = (event.source as Group).groupId;
  const currentTask = taskMap.get(groupId);

  if (currentTask) {
    clearTimeout(currentTask);
  }

  taskMap.set(
    groupId,
    setTimeout(() => randomAction(client, event), WAITING_TIME)
  );
}

function randomAction(client: Client, event: MessageEvent) {
  const action = randomInt(1);

  console.log('randomize action:', action);

  switch (action) {
    case 0:
      reply(client, event, {
        type: 'text',
        text: 'kacang enak ~ lima ribuan ~'
      });
      break;
    case 1:
      const imageUrl = 'https://source.unsplash.com/random/240*240?nut';
      reply(client, event, {
        type: 'image',
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl
      });
  }
}

function randomInt(high: number) {
  return Math.round(Math.random() * high);
}
