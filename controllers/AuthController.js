const AuthService = require("../services/AuthService")
class AuthController{
    
    index(req, res){
        res.render("/index");
    }
//criação de usuario
    //rota get cadastro
    cadastro(req,res){
        res.render("cadastro", {nome_msg: req.flash('nome_msg'),email_msg: req.flash('email_msg'), senha_msg: req.flash('senha_msg')});
    }
    //rota post cadastro
    async store(req,res){
        var{nome, email, senha, senhaa } = req.body;
        var user = {
            nome,
            email,
            password:senha,
            senhaa
        }
        var result = await AuthService.store(user);
        if(result == true){
            const token = await AuthService.token(result.email)
            console.log("registro pronto, token: "+token)//retornou verdadeiro
            res.redirect('/user/index')
        }else{
            req.flash('email_msg', result.email_msg)
            req.flash('senha_msg', result.password_msg)
            req.flash('nome_msg', result.nome_msg)
            res.redirect('/cadastro')
            console.log("nao registrado")//retornou falso
        }

    }

//parte do login
    //rota get do login
    
    login(req,res){
        res.render("login", {result: req.flash('login_msg')})
    }
    //rota post do login
    async autenticacao(req,res){
        var{email, senha} = req.body;
        var user = {
            email,
            senha
        }
        var result = await AuthService.autenticacao(user);
        
        if(result == "Dados invalidos"){
            req.flash('login_msg', result);
            res.redirect('/login')
        }else{
            var token = await AuthService.token(result)
            
            req.session.token = token;
            res.redirect('/user/index')
        }
    }
}

module.exports = new AuthController();