import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js'; 
import userRouter from './routes/users.route.js'
import gamesRouter from './routes/games.route.js';
/*Using sequelize to allow for better interactivity with the database by using 
javascript objects and methods instead of raw queries. Maintains better readability*/

dotenv.config();


const app = express();
app.use(express.json(), cors());

//Testing the connection to mysql database here:
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

//Middleware:
app.use('/api', userRouter)
app.use('/api', gamesRouter)



app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT);
});