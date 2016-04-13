var express = require('express');
var router = express.Router();
var UserHandler = require('../handlers/user');
var handler = new UserHandler();

router.get('/', handler.fetch);
router.get('/:id', handler.fetchById);
router.get('/:id/posts', handler.fetchWithPosts);

router.post('/', handler.create);
router.post('/login', handler.login);
router.put('/:id', handler.update);

router.delete('/:id', handler.remove);

module.exports = router;