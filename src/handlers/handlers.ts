import Client from '@line/bot-sdk/dist/client';
import { MessageEvent } from '@line/bot-sdk';

import * as abayhandler from './AbayHandler';
import * as kacanghandler from './KacangHandler';

const handlers = [abayhandler, kacanghandler];

export function handleEvent(client: Client, event: MessageEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  for (let index = 0; index < handlers.length; index++) {
    const handler = handlers[index];
    const condition: HandlerCondition = handler.getCondition(event);

    if (condition.willHandle) {
      handler.handleEvent(client, event);
    }
    if (condition.willHandle && !condition.continueProcess) {
      break;
    }
  }
}
