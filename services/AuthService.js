var Database = require("../models/index");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/auth.json')
const session = require("express-session");
class AuthService{

    constructor(){
        this.User = Database["Users"];                
    }
//função de criação de usuario
    async store(user){
        var errors = [];
        var isValid = await this.validate(user, errors);
        console.log(errors)
        if(!isValid){        
                console.log("passou pela validação");
            try{
                user.password = await bcrypt.hash(user.password, 10);
                console.log(user)
                await this.User.create(user);
                return true;
            }catch(errors){
                console.log("erro ao salvar"+errors)
                errors.push("Não foi possivel registrar usuario")
                return errors;
            } 
        }else{
            return errors;
        }
    }    
//função de busca no DB
    async getByEmail(dado){
        try{
             var res = await this.User.findOne({where:{email: dado}})            
                if(res == null){
                    return null//se nao existir, retorna null
                }else{
                    return res//se existir retorna os dados do usuario com email
                }
            }catch(err){
                console.log("falha na verificação "+err)
            }

    }
//função de validação para cadastro
    async validate(user, errors){
        try{
            var cont=0;//variavel que conta os erros de formulario
            //verificação de senha
            if(user.senhaa != user.password ){
                errors.password_msg = "As senhas nao coincidem!";
                cont++;
            }else{  }
            //verifica se o email ja existe na base de dados
                var res = await this.getByEmail(user.email);
                if(!res){
                }else{
                    errors.email_msg = "Email ja existe";
                    cont++;
                }
            }catch(errors){ }
            //apos verificações
            if(cont==0){
                console.log("logado")
                return false;
            }else{
                    return true;
            }       
        }
//função de autenticação
        async autenticacao(user){
            try{
                var error="Dados invalidos"
                var cont = 0;
                var email = await this.getByEmail(user.email)
                if(email){ 
                    
                }else{
                    cont++;
                }                
                var senha = await bcrypt.compare(user.senha, email.password)               
                if(senha){
                }else{
                    cont++;
                }
            }catch(errors){  }
            if(cont==0){
                var res = await this.getByEmail(user.email);
                return res
            }else{
                    return error;
            }               
        }

//função que gera um token pro usuario recem logado
        async token(email){
            //gerando token com email de usuario
            const token = await jwt.sign({
                id:email.id,
                nome:email.nome,
                email:email.email}, secret.secret, {
                expiresIn: 86400,
            });
            return token;
            
        }
}


module.exports = new AuthService();