import * as line from '@line/bot-sdk';
import * as express from 'express';
import axios from 'axios';
import { setTimeout, clearTimeout } from 'timers';
import { Message, MessageEvent, EventSource, Group } from '@line/bot-sdk';

import * as handler from './handlers/Handlers';

const config = {
  channelAccessToken:
    'HXb4dPv/7+mKQXOSF7UOlo8XbngUs6x9twjpe/UyKgyhvUBRK9XJ65g75h205A77bg4s/3MTWyydDiyWdPjPbXyQKdyUVntIfP2hShzNVhW2mcx/aupyDep1VyQkeXfz7/H/cGHSSryCikecyfgptAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'ceaed7a0d0256e790435f80d000ef0c0'
};

const app = express();
const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log('--> Receiving webhook');
  Promise.all(req.body.events.map(handleEvent)).then(result =>
    res.json(result)
  );
});

function handleEvent(event: MessageEvent) {
  return handler.handleEvent(client, event);
}

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App listen @ ' + port);
