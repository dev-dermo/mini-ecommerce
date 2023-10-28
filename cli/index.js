const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const inquirer = require('inquirer');
const { Op } = require('sequelize');

const { Product, Category } = require('../models');

function startCLI() {
	inquirer
		.prompt([
			{
				name: 'action',
				message: 'What do you want to do?',
				type: 'list',
				choices: ['Bulk upload products', 'List all products', 'List all categories', 'List products by category', 'List products low in stock', 'Exit']
			}
		])
		.then(({ action }) => {
			switch (action) {
				case 'Bulk upload products':
					const files = fs.readdirSync(path.join(__dirname, 'uploads')).filter(file => file.match(/.csv$/));

					if (!files.length) {
						console.log('No CSV files found in uploads directory.');
						startCLI();
					} else {
						inquirer.prompt([{
							name: 'file',
							message: 'Which file do you want to upload?',
							type: 'list',
							choices: files
						}]).then(({ file }) => {

							const csvFilePath = path.join(__dirname, 'uploads', file);
							const results = [];

							fs.createReadStream(csvFilePath)
								.pipe(csv())
								.on('data', (data) => results.push(data))
								.on('end', () => {
									Product.bulkCreate(results)
										.then(() => {
											console.log('Products uploaded successfully.');
											console.log('Cleaning up uploads directory...');
											fs.unlinkSync(path.join(__dirname, 'uploads', file));
											console.log('CSV file deleted.');
											startCLI();
										})
										.catch(err => {
											console.log("Duplicate data... skipping.");
											startCLI();
										});
								});
						});
					}
					break;
				case 'List all products':
					Product.findAll({}).then(response => {
						const products = response.map(product => product.get({ plain: true }));
						console.table(products);
						startCLI();
					});
					break;
				case 'List all categories':
					Category.findAll({}).then(response => {
						const categories = response.map(category => category.get({ plain: true }));
						console.table(categories);
						startCLI();
					});
					break;
				case 'List products by category':
					
					inquirer
						.prompt([{
							name: 'category_id',
							message: 'Enter category ID:',
							type: 'number',
						}])
						.then(({ category_id }) => {
							Product.findAll({ where: { category_id } }).then(response => {
								const products = response.map(product => product.get({ plain: true }));
								console.table(products);
								startCLI();
							});
						});
					
					break;
				case 'List products low in stock':
					Product.findAll({
						where: { stock: { [Op.lte]: 10 } },
						order: [['stock', 'ASC']]
					}).then(response => {
						const products = response.map(product => product.get({ plain: true }));
						console.table(products);
						startCLI();
					});
					break;
				default:
					console.log('Goodbye!');
					process.exit(0);
			}
		});
}

startCLI();