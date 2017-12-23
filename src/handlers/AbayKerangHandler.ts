import * as _ from 'lodash';
import Client from '@line/bot-sdk/dist/client';
import { MessageEvent, TextMessage } from '@line/bot-sdk';
import { reply, checkInclude } from './utils';

export function getCondition(event: MessageEvent): HandlerCondition {
  const includeAbay = checkInclude(event, 'abay');
  const includeApakah = checkInclude(event, 'apakah');

  return {
    willHandle: includeAbay && includeApakah,
    continueProcess: false
  };
}

export function handleEvent(client: Client, event: MessageEvent): Promise<any> {
  console.log('--> Event handled by AbayKerangHandler');

  return reply(client, event, {
    type: 'text',
    text: getAnswer(event)
  });
}

export function getAnswer(event: MessageEvent) {
  const isHomo = checkInclude(event, 'homo');
  const isTidak = checkInclude(event, 'tidak');

  if (isHomo && !isTidak) {
    return 'Ya';
  }
  if (isHomo && isTidak) {
    return 'Tidak';
  }
  return _.shuffle(['Ya', 'Tidak'])[0];
}
