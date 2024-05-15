import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import router from './routes/users.route.js'


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

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port" + process.env.PORT);
});