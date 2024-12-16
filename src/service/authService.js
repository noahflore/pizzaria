const Usuario= require("../model/usuario")
const jwt= require("jsonwebtoken")

const loginService= (email)=> Usuario.findOne({email})
//na linha de baixo resolvi coloca um tempo de 100 segundos já que se trata de uma atividade
const generateToken= (user,segredo)=> jwt.sign({user},segredo,{expiresIn:10000})

module.exports={
    loginService,
    generateToken
}