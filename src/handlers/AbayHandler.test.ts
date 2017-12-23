import { getCondition, handleEvent } from './abayhandler';
import {
  TextMessage,
  MessageEvent,
  TextEventMessage,
  EventMessage
} from '@line/bot-sdk';

const testData: Array<TextEventMessage> = [
  textMessage('abay mau makan'),
  textMessage('Abay mau makan'),
  textMessage('noabay')
];

function textMessage(message: string): TextEventMessage {
  return {
    id: '',
    type: 'text',
    text: message
  };
}

testData.forEach(data => {
  test(`${data.text} should be handled`, () => {
    const event: MessageEvent = {
      replyToken: '',
      message: data as EventMessage,
      type: 'message',
      source: undefined,
      timestamp: 1
    };

    expect(getCondition(event)).toEqual({
      willHandle: true,
      continueProcess: false
    });
  });
});
