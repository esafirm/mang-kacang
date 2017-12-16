import * as line from '@line/bot-sdk';
import * as express from 'express';
import axios from 'axios';
import { setTimeout, clearTimeout } from 'timers';
import { Message, MessageEvent, EventSource, Group } from '@line/bot-sdk';

const config = {
  channelAccessToken:
    'HXb4dPv/7+mKQXOSF7UOlo8XbngUs6x9twjpe/UyKgyhvUBRK9XJ65g75h205A77bg4s/3MTWyydDiyWdPjPbXyQKdyUVntIfP2hShzNVhW2mcx/aupyDep1VyQkeXfz7/H/cGHSSryCikecyfgptAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'ceaed7a0d0256e790435f80d000ef0c0'
};

const WAITING_TIME = 15 * 1000;

const app = express();
const client = new line.Client(config);

const taskMap = new Map();

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log('Receiving webhook');
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

function handleEvent(event: MessageEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const type: string = event.source.type;
  const textMessage: string = event.message.text;

  if (textMessage.includes('abay')) {
    const abayImage =
      'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/188503_1601344285846_4341498_n.jpg?oh=522807be30b698fee1f45d3349bd228c&oe=5AD05C5D';
    return reply(event, {
      type: 'image',
      originalContentUrl: abayImage,
      previewImageUrl: abayImage
    });
  }

  if (type === 'group') {
    const groupId: string = (event.source as Group).groupId;
    const currentTask = taskMap.get(groupId);
    if (currentTask) {
      clearTimeout(currentTask);
    }

    taskMap.set(groupId, setTimeout(() => randomAction(event), WAITING_TIME));
  }
}

function randomAction(event: any) {
  const action = randomInt(1);

  console.log('randomize action:', action);

  switch (action) {
    case 0:
      client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'kacang enak ~ lima ribuan ~'
      });
      break;
    case 1:
      const imageUrl = 'https://source.unsplash.com/random/240*240?nut';
      client
        .replyMessage(event.replyToken, {
          type: 'image',
          originalContentUrl: imageUrl,
          previewImageUrl: imageUrl
        })
        .catch(error => console.log('LINE ERROR', error));
  }
}

function randomInt(high: number) {
  return Math.round(Math.random() * high);
}

function reply(event: MessageEvent, payload: any) {
  return client
    .replyMessage(event.replyToken, payload)
    .catch(error => console.log('LINE ERROR', error));
}

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App listen @ ' + port);
