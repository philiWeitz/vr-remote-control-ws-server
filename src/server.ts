import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import config from './config';
import { HeadPosition } from './model/head-position';

const app = express();

const server = http.createServer(app);

const wsServer = new WebSocket.Server({ server });

let subscriptions: WebSocket[] = [];


wsServer.on('connection', (ws: WebSocket) => {

  ws.on('message', (message: string) => {
    if (message === 'subscribe') {
      subscriptions.push(ws);
      ws.send('Subscription successful');
      return;
    }

    try {
      subscriptions.forEach((subscriber) => {
        const rotationVector = JSON.parse(message);

        const value: HeadPosition = {
          horizontal: eulerAngleToPWMValue(rotationVector.y),
        };

        subscriber.send(JSON.stringify(value));
      });
    } catch(e) {
      subscriptions = subscriptions.filter(
        (subscriber) => subscriber.readyState === 1);
    }
  });

  console.debug('Client connected');
});


function eulerAngleToPWMValue(eulerAngle: number) {
  let value = 0;

  // map to 0 - 180 degree
  if (eulerAngle < 180) {
    value = Math.max(0, 90 - eulerAngle);
  } else {
    value = Math.min(180, 90 + Math.abs(eulerAngle - 360));
  }

  // map to 0 - 1024
  return Math.round((1024 * value) / 180);
}


//start the server
server.listen(config.WS_SERVER_PORT, () => {
  console.log(`Server started on port ${config.WS_SERVER_PORT}`);
});
