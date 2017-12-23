import { getAnswer } from './AbayKerangHandler';
import { TextEventMessage, MessageEvent, EventMessage } from '@line/bot-sdk';

function textMessage(message: string): MessageEvent {
  const textEvent = {
    id: '',
    type: 'text',
    text: message
  };

  return {
    replyToken: '',
    message: textEvent as EventMessage,
    type: 'message',
    source: undefined,
    timestamp: 1
  };
}

test('Should answer YA', () => {
  const message = textMessage('Apakah abay homo?') as MessageEvent;
  expect(getAnswer(message)).toEqual('Ya');
});

test('Should answer TIDAK', () => {
  const message = textMessage('Apakah abay tidak homo?') as MessageEvent;
  expect(getAnswer(message)).toEqual('Tidak');
});
