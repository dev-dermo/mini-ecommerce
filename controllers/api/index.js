const router = require('express').Router();
const { Product } = require('../../models');

router.get('/', (req, res) => {
	res.json({
		message: 'API up and running!'
	});
});

// all products
router.get('/products', async (req, res) => {
	try {
		const response = await Product.findAll({ include: ['category'] });

		if (!response) {
			return res.status(404).json({ message: 'No products found!' });
		}

		const products = response.map(product => product.get({ plain: true }));
		console.log(products);
		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

module.exports = router;