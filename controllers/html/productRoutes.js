const router = require('express').Router();
const { Product } = require('../../models');

router.get('/', async (req, res) => {
	try {
		const response = await Product.findAll({ include: ['category'] });

		if (!response) {
			return res.redirect('/404');
		}

		const products = await response.map(product => product.get({ plain: true }));
		console.log(products);
		res.send('Check console.');
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
});

router.get('/:productId', async (req, res) => {
	try {
		const response = await Product.findAll({
			where: {
				id: req.params.productId,
			},
			include: ['category'],
		});

		if (!response) {
			return res.redirect('/404');
		}

		const products = await response.map(product => product.get({ plain: true }));
		console.log(products);
		res.send('Check console.');
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
});

module.exports = router;