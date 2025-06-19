import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from "./user.js";

const Campaign = sequelize.define('Campaign',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    impressions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversions: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Campaign.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Campaign, { foreignKey: 'userId' });

export default Campaign;
