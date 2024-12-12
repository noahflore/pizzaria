const carrinhoService=require("../service/carrinhoService")

const findCarrinhoByIdController= async (req,res)=>{
    
    try{
        return res.status(200).send(await carrinhoService.findCarrinhoByIdService(req.params.id))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const findAllCarrinhoController=async (req,res)=>{
    
    try{
        return res.status(200).send(await carrinhoService.findAllCarrinhoService(req.query.limit,req.query.offset))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const createCarrinhoController=async (req,res)=>{

    try{
        const corpo={
            ...req.body,
            userId: req.userId
        }
        return res.status(201).send(await carrinhoService.createCarrinhoService(corpo))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const updateCarrinhoController=async (req,res)=>{
    
    try{
        return res.status(200).send(await carrinhoService.updateCarrinhoService(req.params.id,req.body))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const deleteCarrinhoController=async (req,res)=>{
    
    try{
        return res.status(200).send(await carrinhoService.deleteCarrinhoService(req.params.id))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

module.exports={
    findCarrinhoByIdController,
    findAllCarrinhoController,
    createCarrinhoController,
    updateCarrinhoController,
    deleteCarrinhoController
}