const jwt = require("jsonwebtoken")//importa jsonwebtoken
//importa apenas o findById do serviço de usuário
const {findByIdServiceUsuario}= require("../service/usuarioService")

module.exports= async (req,res,next)=>{
    //o const recebe o token via 'req.headers.authorization'
   const authHeaders= req.headers.authorization

   //se o const tiver vázio o token não foi informado
    if(!authHeaders){
        return res.status(401).send({message:"o token não foi informado."})
    }

    //o token é dividido em duas partes separado pelo espaço
    const parts = authHeaders.split(" ")

    //verifica se o token tem o tamanho ideal no caso valor 2
    if(parts.length !== 2){
        console.log("token tem um tamanho acima de 2")
        return res.status(401).send({message:"o token é invalido."})
    }

    //o const parts é desmontado em 'schema' e 'token'
    const [schema , token]= parts

    //verifica se 'schema' tem incluso a palavra 'Bearer'
    if(!/^Bearer$/i.test(schema)){
        return res.status(401).send({message:"o token malformatado."})
    }

    /*
    o 'jwt' vai verifica se o 'token' contem erro e decodifica para texto puro
    é necessário usa a mesma chave que foi usado para criar o token
    */
    jwt.verify(token,process.env.SECRETKEY,async (err,decoded)=>{
        //verifica se encontrou algum erro
        if(err){
            console.log(`erro verify: ${err}`)
            return res.status(401).send({message:"o token invalido."})
        }
        //usa o findById do serviço de usuário para para encontra o usuário
        const user= await findByIdServiceUsuario(decoded.user._id)

        //testa se o 'user' não está vázio ou se o 'user.id' não está vázio
        if(!user || !user.id){
            console.log(`erro user: ${user}`)
            return res.status(401).send({message:"o token invalido."})
        }

        //agora o 'req.userId' recebe o ID do usuário
        req.userId= decoded.user._id

        return next()
    })
}