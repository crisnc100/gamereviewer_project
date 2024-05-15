import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();


const app = express();

app.use(express.json(), cors());

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT);
});