const express = require("express");

const router = express.Router();

const { userContoller } = require('./UserController');

const {authenticate} = require('./../../Middleware/Authenticate');
const {adminAccess} = require('./../../Middleware/AdminAccessMiddleware');

// Insert middlewares
router.use('/', (req, res, next) => {
    authenticate.handle(req, res, next)
});

router.use('/', (req, res, next) => {
    adminAccess.handle(req, res, next)
});

router.get('/', userContoller.index);

router.post('/', userContoller.store);

router.post('/:id', userContoller.update);

router.get('/:id', userContoller.show);

router.post('/:id/delete', userContoller.delete);

module.exports = router;