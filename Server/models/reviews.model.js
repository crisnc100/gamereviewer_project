import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './users.model.js';
import Games from './games.model.js';

const Reviews = sequelize.define('Reviews', {
    reviewText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Games,
            key: 'id'
        }
    }
 }, {
    tableName: 'Reviews',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

//Defining the relationships between them
User.hasMany(Reviews, {foreignKey: 'userId'});
Reviews.belongsTo(User, {foreignKey: 'userId'});
Games.hasMany(Reviews, {foreignKey: 'gameId'});
Reviews.belongsTo(Games, {foreignKey: 'gameId'});

export default Reviews;