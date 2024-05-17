import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './users.model.js';
import Games from './games.model.js';

const Favorites = sequelize.define('Favorites', {
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
    tableName: 'Favorites',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

User.hasMany(Favorites, {foreignKey: 'userId'});
Favorites.belongsTo(User, {foreignKey: 'userId'});
Games.hasMany(Favorites, {foreignKey: 'gameId'});
Favorites.belongsTo(Games, {foreignKey: 'gameId'});

export default Favorites;