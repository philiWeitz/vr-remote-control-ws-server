import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import config from './config';


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
        let value = 0;
        const rotation = JSON.parse(message);

        if (rotation.y < 180) {
          value = Math.max(0, 90 - rotation.y);
        } else {
          value = Math.min(180, 90 + Math.abs(rotation.y - 360));
        }

        subscriber.send(value);
      });
    } catch(e) {
      subscriptions = subscriptions.filter(
        (subscriber) => subscriber.readyState === 1);
    }
  });

  console.debug('Client connected');
});


//start the server
server.listen(config.WS_SERVER_PORT, () => {
  console.log(`Server started on port ${config.WS_SERVER_PORT}`);
});
