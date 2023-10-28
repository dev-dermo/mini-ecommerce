const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Product extends Model { }

Product.init({
	product_name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
		validate: {
			isDecimal: true
		}
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 10,
		validate: {
			isNumeric: true
		}
	},
	category_id: {
		type: DataTypes.INTEGER,
		references: {
			model: 'category',
			key: 'id'
		}
	}
}, {
	sequelize,
	timestamps: false,
	freezeTableName: true,
	modelName: 'product'
});

module.exports = Product;