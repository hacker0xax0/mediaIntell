import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { Connection } from './connection/db.js';
import { route } from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(cors());
app.use('/', route);
Connection();
app.listen(PORT,()=>console.log(`server is running at ${PORT}`));




