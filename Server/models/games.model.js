import { DataTypes } from 'sequelize';
import User from './users.model.js';
import sequelize from '../config/db.js';

const Games = sequelize.define('Games',{
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [1,45]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            len: [2, 200]
        }
    },
    isRented: {
        type: DataTypes.TINYINT,
        allowNull: true,
    },
    //Getting the foreign key of users table ID
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    tableName: 'Games',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

//This establishes the relationship between User and Games
User.hasMany(Games, { foreignKey: 'userId' });
Games.belongsTo(User, { foreignKey: 'userId' });

export default Games;