const jwt = require("jsonwebtoken")
const {findByIdService}= require("../service/usuarioService")

module.exports= async (req,res,next)=>{
   const authHeaders= req.headers.authorization

    if(!authHeaders){
        return res.status(401).send({message:"o token não foi informado."})
    }

    const parts = authHeaders.split(" ")

    if(parts.length !== 2){
        console.log("token tem um tamanho acima de 2")
        return res.status(401).send({message:"o token invalido."})
    }

    const [schema , token]= parts

    if(!/^Bearer$/i.test(schema)){
        return res.status(401).send({message:"o token malformatado."})
    }

    jwt.verify(token,process.env.SECRETKEY,async (err,decoded)=>{
        if(err){
            console.log(`erro verify: ${err}`)
            return res.status(500).send({message:"o token invalido."})
        }
        //se de erro aqui verifica se o id foi pego do req ou decoded
        const user= await findByIdService(decoded.user._id)

        if(!user || !user.id){
            console.log(`erro user: ${user}`)
            return res.status(500).send({message:"o token invalido."})
        }

        req.userId= decoded.user._id

        return next()
    })
}