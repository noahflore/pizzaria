const categoriaService= require("../service/categoriaService")

const findCategoriaByIdController= async (req,res)=>{
    
    try{
        return res.send(await categoriaService.findCategoriaByIdService(req.params.id))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const findAllCategoriaController= async (req,res)=>{
    try{
        return res.send(await categoriaService.findAllCategoriaService(req.query.limit,req.query.offset))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const createCategoriaController= async (req,res)=>{
    try{

        return res.status(201).send(await categoriaService.createCategoriaService(req.body))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const updateCategoriaController= async (req,res)=>{
    try{
        return res.send(await categoriaService.updateCategoriaService(req.params.id,req.body))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const deleteCategoriaController= async (req,res)=>{
    try{
        const corpo= await categoriaService.deleteCategoriaService(req.params.id)

        if(corpo){
            return res.status(200).send({message:"deletado com sucesso."})
        }else{
            return res.status(400).send({message:"objeto não foi encontrado pelo ID."})
        }
    }catch(err){
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