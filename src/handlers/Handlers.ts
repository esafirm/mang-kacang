import Client from '@line/bot-sdk/dist/client';
import { MessageEvent } from '@line/bot-sdk';

import * as abayhandler from './AbayHandler';
import * as abayKerangHandler from './AbayKerangHandler';
import * as kacanghandler from './KacangHandler';

const handlers = [abayKerangHandler, abayhandler, kacanghandler];

export function handleEvent(client: Client, event: MessageEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  for (let index = 0; index < handlers.length; index++) {
    const handler = handlers[index];
    const condition: HandlerCondition = handler.getCondition(event);
    const shouldContinue: boolean = processEvent(condition, () =>
      handler.handleEvent(client, event)
    );

    if (!shouldContinue) {
      console.log('Breaking event handler @ ', handler);
      break;
    }
  }
}

export function processEvent(
  condition: HandlerCondition,
  action: any
): boolean {
  if (condition.willHandle) {
    action();
    return condition.continueProcess;
  }
  return true;
}
