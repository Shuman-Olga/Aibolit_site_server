const express = require('express'),
  router = express.Router(),
  messages = require('../controllers/messageController');

router.post('/', messages.create).get('/', messages.findAll);

module.exports = router;
