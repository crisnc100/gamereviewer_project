// Connection to MySQL, installed mysql12 and bycrpt
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
/*Using sequelize to allow for better interactivity with the database by using 
javascript objects and methods instead of raw queries. Maintains better readability*/

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    charset: 'utf8mb4'
  }
);

export default sequelize;
