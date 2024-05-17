import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './users.model.js';
import Games from './games.model.js';

const Rentals = sequelize.define('Review', {
    rentalDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
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
    tableName: 'Rentals',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
//Defining relationships between the tables
User.hasMany(Rentals, {foreignKey: 'userId'});
Rentals.belongsTo(User, {foreignKey: 'userId'});
Games.hasMany(Rentals, {foreignKey: 'gameId'});
Rentals.belongsTo(Games, {foreignKey: 'gameId'});

export default Rentals;