import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);


export default app;
