const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use(homeRoutes);

module.exports = router;