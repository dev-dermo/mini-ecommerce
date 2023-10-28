const router = require('express').Router();
const { Product, Category } = require('../../models');

router.get('/', (req, res) => {
	res.json({
		message: 'API up and running!'
	});
});

module.exports = router;