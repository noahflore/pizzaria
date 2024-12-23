const pizzaService= require("../service/pizzaService")

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
        let found= false

        const corpo= await pizzaService.deletePizzaService(req.params.id)

        if(corpo){
            found= true
        }

        if(found){
          return res.status(200).send({message:"deletado com sucesso."})
        }else{
            return res.status(400).send({message:"o ID informado não foi encontrado."})
        }

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const addCategoriaPizzaController= async (req,res)=>{

    try{
        return res.send(await pizzaService.addCategoriaPizzaService(req.params.id,req.body))

    }catch(err){
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const removeCategoriaPizzaController= async (req,res)=>{

    try{
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