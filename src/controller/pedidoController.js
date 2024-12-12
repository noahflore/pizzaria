const pedidoService=require("../service/pedidoService")

const findPedidoByIdController= async (req,res)=>{
    
    try{
        return res.status(200).send(await pedidoService.findPedidoByIdService(req.params.id))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const findAllPedidoController=async (req,res)=>{
    
    try{
        return res.status(200).send(await pedidoService.findAllPedidoService(req.query.limit,req.query.offset))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const createPedidoController=async (req,res)=>{

    try{
        const corpo={
            ...req.body,
            userId: req.userId
        }
        return res.status(201).send(await pedidoService.createPedidoService(corpo))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const updateStatusPedidoController=async (req,res)=>{
    
    try{
        return res.status(200).send(await pedidoService.updateStatusPedidoService(req.params.id))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const deletePedidoController=async (req,res)=>{
    
    try{
        return res.status(200).send(await pedidoService.deletePedidoService(req.params.id))


    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

module.exports={
    findPedidoByIdController,
    findAllPedidoController,
    createPedidoController,
    updateStatusPedidoController,
    deletePedidoController
}