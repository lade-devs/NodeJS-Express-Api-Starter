const express = require("express");

const {authenticate} = require('../App/Middleware/Authenticate');

const router = express.Router();

// All routes
const postRoute = require('../App/Feature/Post/PostRoute')
const userRoute = require('../App/Feature/User/UserRoute')
const authRoute = require('../App/Feature/Auth/AuthRoute')

router.use('/post', postRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute);

module.exports = router;