var Database = require("../models/index");

class UserService{
    constructor(){//trazendo banco de dados para o arquivo
        this.User = Database["Users"];                
    }




}


module.exports = new UserService();