import Client from '@line/bot-sdk/dist/client';
import { MessageEvent } from '@line/bot-sdk';

import * as abayhandler from './abayhandler';
import * as kacanghandler from './kacanghandler';

const handlers = [abayhandler, kacanghandler];

export function handleEvent(client: Client, event: MessageEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return handlers
    .filter(handler => handler.willHandle(event))
    .map(handler => handler.handleEvent(client, event));
}
