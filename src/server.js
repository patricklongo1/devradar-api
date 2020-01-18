import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';

import { setupWebsocket } from './websocket';
import routes from './routes';

mongoose.connect('mongodb://localhost:27017/devradar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
