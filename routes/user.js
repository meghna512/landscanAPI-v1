const router = require('express').Router();
const {createUser, loginUser} = require('../controller/user/user');
const {validateBody} = require('../middleware/user');

//login
router.post('/login', validateBody, loginUser);

//signup
router.post('/signup', validateBody, createUser);

module.exports = router;