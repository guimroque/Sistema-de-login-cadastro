
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

class AuthController{

    login(req, res, next){
        if(req.session.token){
            console.log('md ok')
            next()
        }else{
            res.render('./errors/sessao_exp')
        }
    }
    admin(req, res, next){
        jwt.verify(req.session.token, authConfig.secret, (err, decoded)=>{
            if(err){
                res.render('./errors/access_restrito')
            }
            if(decoded.email=='admin@gmail.com'){
                console.log('mdadmin ok')
                next()
            }
        })
    }

}

module.exports = new AuthController();