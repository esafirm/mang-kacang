import * as _ from 'lodash';
import Client from '@line/bot-sdk/dist/client';
import { MessageEvent, TextMessage } from '@line/bot-sdk';
import { reply } from './utils';

export function getCondition(event: MessageEvent): HandlerCondition {
  return {
    willHandle: (event.message as TextMessage).text
      .toLowerCase()
      .includes('abay'),
    continueProcess: false
  };
}

export function handleEvent(client: Client, event: MessageEvent): Promise<any> {
  console.log('--> Event handled by AbayHandler')

  const abayImage = _.shuffle([
    'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/188503_1601344285846_4341498_n.jpg?oh=522807be30b698fee1f45d3349bd228c&oe=5AD05C5D',
    'https://scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/155936_121730667891072_4752079_n.jpg?oh=26f427c4358edc0d932ef238ee2c186c&oe=5AB8C090',
    'https://lh3.googleusercontent.com/DbQy4CB5DbwNrZr5jRFU5Jau0e5R0VwhbEpIGMrfnErK1dECkc7lTVvcXDYB5MIG3AnXcz3d6xfsBRYw0iVALpoWfxGPz-sDT1upNwaeZopb28CDjVKcwq0cKrwhJuKCdWPxU3uZhWkBj5pEP2F52eYY-ZvKzWtLs0Xg07ovHMR4oSofLrrpTx6QcbJt9RRTv7iy0AkVLOpNRbmlOikdQ-9t8oqWpsrMg1Yb5_ylNIO7ts0KErTt1wFKU6T2fOhtHlymqFh1lOj2DATM1fFHCPGi2B6tUHJQ32krlUwJALU86y-GznGSKMMdu4gX-ed5YlkD7O7tvOV4Wvwqi6bRf7tth_Dss8C5NPyYnDGUajT5xLIOzY0YuBTuU3YIXOnuYTUXQcaGRHdYfX1dAVP-_JGtrCKmPY4O3rmyVJnzBTbsMpvNC_PwK6SfuivmsL-AAV_HGQ7i8lZ8XVlhhZBMqFYQuorgpoxWFSFmjtCt24_X-saM0UbV_NYq6P_F1uz9KGJ1a7IZad2CYvEEeoP2olmLJzEdgJdoBo8Z-qySDE9m1JyBmGyPZGb4aSVMjIZ_9Kya2fCRwtaq63MAvIYTElt18rVgMzZPYZC8qG4f=w1646-h972-no'
  ])[0];
  return reply(client, event, {
    type: 'image',
    originalContentUrl: abayImage,
    previewImageUrl: abayImage
  });
}
