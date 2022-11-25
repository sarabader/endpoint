import express from 'express';
import MovieRouter from './router/movie.route';
import studentRouter from './router/student.route';
import bankRouter from './router/bank.route';
import 'dotenv/config';
import { connectDB } from './config/db';

const app = express();

// Config
connectDB();

app.use(express.json());

app.use('/Movie', MovieRouter);
app.use('/student', studentRouter);
app.use('/customer', bankRouter);



app.listen(5000, () => {
  console.log('Server is running in port 5000');
});