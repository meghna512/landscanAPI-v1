const router = require('express').Router();
const regionRoutes = require('./region');
const userRoutes = require('./user');

router.use('/region', regionRoutes);
router.use('/user', userRoutes);

module.exports = router;