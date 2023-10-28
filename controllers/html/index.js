const router = require('express').Router();
const { Product } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const response = await Product.findAll();
		const products = await response.map((product) => product.get({ plain: true }));
		res.render('home', {
			title: 'Home Page',
			newArrivals: products.slice(0, 4),
			bestSellers: products.slice(4, 8),
		});
	} catch (error) {
		res.status(500).end();
	}
});

module.exports = router;