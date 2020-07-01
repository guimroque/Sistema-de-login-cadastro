const UserService = require("../services/UserService")
class UserController{

    index(req, res){
        res.render('user/index');
    }
    

}

module.exports = new UserController();