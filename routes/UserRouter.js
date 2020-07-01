var express = require("express")
var router = express.Router();
var UserController = require('../controllers/UserController');
const middleware = require('../middleware/auth')

router.get('/index',middleware.login, UserController.index);



module.exports = router;