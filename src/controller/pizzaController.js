const pizzaService= require("../service/pizzaService")
const {findCategoriaByIdService}= require("../service/categoriaService")

const findByIdPizzaController= async (req,res)=>{

    try{
        res.send(await pizzaService.findPizzaByIdService(req.params.id))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const findAllPizzasController= async (req,res)=>{

    try{
        res.send(await pizzaService.findPizzasAllService(req.query.limit,req.query.offset))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const createPizzaController= async (req,res)=>{

    try{
        const corpo={
            ...req.body,
            userId: req.userId
        }
        res.status(201).send(await pizzaService.createPizzaService(corpo))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const updatePizzaController= async (req,res)=>{

    try{
        return res.send(await pizzaService.updatePizzaService(req.params.id,req.body))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const deletePizzaController= async (req,res)=>{

    try{
       const corpo= await categoriaService.deleteCategoriaService(req.params.id)
      
       if(corpo){
            return res.status(200).send({message:"deletado com sucesso."})
        }else{
            return res.status(200).send({message:"objeto não foi encontrado pelo ID."})
        }
    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const addCategoriaPizzaController= async (req,res)=>{

    try{
        const corpo={
            ...req.body,
            createdAt: Date.now()
        }
        return res.status(201).send(await pizzaService.addCategoriaPizzaService(req.params.id,corpo))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const removeCategoriaPizzaController= async (req,res)=>{

    try{
        const categoria= await findCategoriaByIdService(req.body)
        const corpo= await pizzaService.findPizzaByIdService(req.params.id)

        if(!categoria){
            return res.status(400).send({message:"categoria não foi encontrado pelo ID."})
        }

        if(!corpo){
            return res.status(400).send({message:"pizza não foi encontrado pelo ID."})
        }
        return res.send(await pizzaService.removeCategoriaPizzaService(req.params.id,req.body))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

module.exports = {
    findByIdPizzaController,
    findAllPizzasController,
    createPizzaController,
    updatePizzaController,
    deletePizzaController,
    addCategoriaPizzaController,
    removeCategoriaPizzaController
}