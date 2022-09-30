import express from 'express'

import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import {notFound} from "./middlewares/notFound.js";
import disclaimerRoutes from "./routes/disclaimer.js";
import Errors from "./middlewares/errors.js";
import poolAddressRoutes from "./routes/poolAddreses.js";
import cors from 'cors'
import newsRouter from './routes/news.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors('*'));
// Routes
app.use('/api/disclaimer', disclaimerRoutes)
app.use('/api/news', newsRouter)
app.use('/api/poolAddress', poolAddressRoutes);

// Middlewares
app.use(notFound);
app.use(Errors);


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `));