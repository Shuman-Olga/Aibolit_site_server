const express = require('express'),
  router = express.Router(),
  messagesRoutes = require('./messageRoutes');

router.use('/', messagesRoutes);

module.exports = router;
