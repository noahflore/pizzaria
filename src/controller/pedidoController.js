const pedidoService=require("../service/pedidoService")//importa o serviço do pedido

const findPedidoByIdController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.status(200).send(await pedidoService.findPedidoByIdService(req.params.id))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const findAllPedidoController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.status(200).send(await pedidoService.findAllPedidoService(req.query.limit,req.query.offset))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const createPedidoController= async (req,res)=>{
    
    try{//constrói o corpo do objeto onde é colocado o ID do usuário
        const corpo={
            ...req.body,
            userId: req.userId
        }

        //chama o serviço responsável pela ação
        return res.status(201).send(await pedidoService.createPedidoService(corpo))

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const updateStatusPedidoController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.status(200).send(await pedidoService.updateStatusPedidoService(req.params.id))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const deletePedidoController= async (req,res)=>{

    try{//chama o serviço responsável pela ação
        const corpo= await pedidoService.findPedidoByIdService(req.params.id)

        /*
        verifica se a const 'corpo' não está vázio se sim o objeto foi deletado
        caso contraio o objeto não foi encontrado
        */
        if(!corpo){
            return res.status(400).send({message:"pedido não foi encontrado pelo ID."})
        }
        return res.status(200).send(await pedidoService.deletePedidoService(req.params.id))

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
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