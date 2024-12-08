const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const router = express.Router();

router.post('/', authenticate, sendMessage);
router.get('/:receptorId', authenticate, getMessages);

module.exports = router;
