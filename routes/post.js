var express = require('express');
var router = express.Router();
var Handler = require('../handlers/post');
var handler = new Handler();

router.get('/', handler.fetch);
router.get('/:id', handler.fetchById);

router.post('/', handler.create);
router.put('/:id', handler.update);

router.delete('/:id', handler.remove);

module.exports = router;