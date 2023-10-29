const router = require('express').Router();
const { Product } = require('../../models');

// home page
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
		console.error(error);
		res.status(500).end();
	}
});

// handle any uncaught route and redirect to 404 page
router.use('*', (req, res) => res.render('404'));

module.exports = router;