var express = require("express")
var router = express.Router();
var AuthController = require("../controllers/AuthController");
const session = require('express-session')

router.get("/cadastro", AuthController.cadastro);

router.post("/cadastro/store", AuthController.store);

router.get("/login", AuthController.login);

router.post("/login/auth", AuthController.autenticacao);


module.exports = router;