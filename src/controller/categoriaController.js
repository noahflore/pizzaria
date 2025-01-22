const categoriaService= require("../service/categoriaService")//importa o serviço da categoria

const findCategoriaByIdController= async (req,res)=>{
    
    try{//chama o serviço responsável pela ação
        return res.send(await categoriaService.findCategoriaByIdService(req.params.id))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const findAllCategoriaController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.send(await categoriaService.findAllCategoriaService(req.query.limit,req.query.offset))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const createCategoriaController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.status(201).send(await categoriaService.createCategoriaService(req.body))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const updateCategoriaController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.send(await categoriaService.updateCategoriaService(req.params.id,req.body))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const deleteCategoriaController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        const corpo= await categoriaService.deleteCategoriaService(req.params.id)

        /*
        verifica se a const 'corpo' não está vázio se sim o objeto foi deletado
        caso contraio o objeto não foi encontrado
        */
        if(corpo){
            return res.status(200).send({message:"deletado com sucesso."})
        }else{
            return res.status(400).send({message:"objeto não foi encontrado pelo ID."})
        }
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

module.exports={
    findCategoriaByIdController,
    findAllCategoriaController,
    createCategoriaController,
    updateCategoriaController,
    deleteCategoriaController
}