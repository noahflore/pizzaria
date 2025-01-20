const Usuario= require("../model/usuario")//módulo do modelo do usuário
const jwt= require("jsonwebtoken")//usa a LIB responsável pela geração de token

//verifica se o usuário existe usando o email como método de busca
const loginService= (email)=> Usuario.findOne({email})

//criar um token usando o usuário válido e uma phasekey no caso a var 'segredo' é a phashkey
const generateToken= (user,segredo)=> jwt.sign({user},segredo,{expiresIn:10000})

module.exports={
    loginService,
    generateToken
}