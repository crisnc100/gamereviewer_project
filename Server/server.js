import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/users.route.js'


dotenv.config();


const app = express();

app.use(express.json(), cors());

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT);
});