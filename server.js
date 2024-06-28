import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import router from './routes/index.js'

import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: "10mb"}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,)
    .then(() => console.log('Connected to MongoDB '))
    .catch(err => console.log(err));

app.use('/api', router)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})