import Client from '@line/bot-sdk/dist/client';
import { MessageEvent, TextMessage, Group } from '@line/bot-sdk';
import { push } from './utils';

const WAITING_TIME = 2 * 60 * 1000;
const taskMap = new Map();

export function getCondition(event: MessageEvent): HandlerCondition {
  return {
    willHandle: event.source.type === 'group',
    continueProcess: true
  };
}

export function handleEvent(client: Client, event: MessageEvent) {
  console.log('--> Event handled by KacangHandler');

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
      push(client, event, {
        type: 'text',
        text: 'kacang enak ~ lima ribuan ~'
      });
      break;
    case 1:
      const imageUrl = 'https://source.unsplash.com/random/240*240?nut';
      push(client, event, {
        type: 'image',
        originalContentUrl: imageUrl,
        previewImageUrl: imageUrl
      });
  }
}

function randomInt(high: number) {
  return Math.round(Math.random() * high);
}
