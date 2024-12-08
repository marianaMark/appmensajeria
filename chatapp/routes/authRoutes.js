const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const { getUsers } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, getUsers); // Ruta protegida

module.exports = router;
