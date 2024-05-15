import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class MySQLConnection {
  constructor(db) {
    this.connection = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: db,
      charset: 'utf8mb4'
    });
  }

  async query_db(query, data = []) {
    const connection = await this.connection.getConnection();
    try {
      const [results] = await connection.query(query, data);
      return results;
    } catch (error) {
      console.error('Something went wrong', error);
      return false;
    } finally {
      connection.release();
    }
  }
}

export const connectToMySQL = (db) => {
  return new MySQLConnection(db);
};
