const express = require("express");

const router = express.Router();

const { postContoller } = require('./PostController');

const {authenticate} = require('./../../Middleware/Authenticate');

const {postRequest} = require('./PostRequest');

// Insert middlewares
router.use('/', (req, res, next) => {
    authenticate.handle(req, res, next)
});

router.get('/', postContoller.index);

router.post('/', postRequest, postContoller.store);

router.post('/:id', postContoller.update);

router.get('/:id', postContoller.show);

router.post('/:id/delete', postContoller.delete);

module.exports = router;