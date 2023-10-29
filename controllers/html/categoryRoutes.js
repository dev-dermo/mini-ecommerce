const router = require('express').Router();
const { Product } = require('../../models');

router.get('/:categoryId/products', async (req, res) => {
	try {
		const response = await Product.findAll({ where: { category_id: req.params.categoryId }, include: ['category'] });

		if (!response) {
			return res.status(404).end();
		}

		const products = await response.map((product) => product.get({ plain: true }));
		console.log(products);
		res.send('Check console.');
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
});

router.get('/:categoryId/products/:productId', async (req, res) => {
	try {
		const response = await Product.findOne({
			where: {
				id: req.params.productId,
				category_id: req.params.categoryId,
			},
			include: ['category'],
		});

		if (!response) {
			return res.redirect('/404');
		}

		const product = await response.get({ plain: true });
		console.log(product);
		res.send('Check console.');
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
});

module.exports = router;