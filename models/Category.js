const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Category extends Model { }

Category.init({
	category_name: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	modelName: 'category'
});

module.exports = Category;