const router = require('express').Router();
const htmlRoutes = require('./html');
const apiRoutes = require('./api');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('*', (req, res) => res.render('404'));

module.exports = router;