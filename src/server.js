import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

mongoose.connect('mongodb://localhost:27017/devradar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
