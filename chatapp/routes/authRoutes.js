const express = require('express');
const { register, login, getUsers } = require('../controllers/authController');
const authenticate  = require('../middleware/authenticate');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, getUsers); // Ruta protegida

module.exports = router;
