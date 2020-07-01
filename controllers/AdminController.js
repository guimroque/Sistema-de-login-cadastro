const UserService = require("../services/UserService")

class AdminController{

    index(req, res){
        res.render('admin/missions');
    }
    

}

module.exports = new AdminController();