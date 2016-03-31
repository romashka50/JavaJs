var express = require('express');
var router = express.Router();
var UserHandler = require('../handlers/user');
var handler = new UserHandler();

router.get('/', handler.fetch);

module.exports = router;