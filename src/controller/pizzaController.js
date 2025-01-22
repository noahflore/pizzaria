const pizzaService= require("../service/pizzaService")//importa o serviço da pizza
//importa apenas o findById do serviço categoria
const {findCategoriaByIdService}= require("../service/categoriaService")

const findByIdPizzaController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        res.send(await pizzaService.findPizzaByIdService(req.params.id))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const findAllPizzasController= async (req,res)=>{

    try{//chama o serviço responsável pela ação
        res.send(await pizzaService.findPizzasAllService(req.query.limit,req.query.offset))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const createPizzaController= async (req,res)=>{

    try{//constrói o corpo do objeto onde é colocado o ID do usuário
        const corpo={
            ...req.body,
            userId: req.userId
        }

        //chama o serviço responsável pela ação
        res.status(201).send(await pizzaService.createPizzaService(corpo))

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const updatePizzaController= async (req,res)=>{

    try{//chama o serviço responsável pela ação
        return res.send(await pizzaService.updatePizzaService(req.params.id,req.body))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const deletePizzaController= async (req,res)=>{

    try{//chama o serviço responsável pela ação
       const corpo= await pizzaService.deletePizzaService(req.params.id)
      
       /*
        verifica se a const 'corpo' não está vázio se sim o objeto foi deletado
        caso contraio o objeto não foi encontrado
       */
       if(corpo){
            return res.status(200).send({message:"deletado com sucesso."})
        }else{
            return res.status(404).send({message:"objeto não foi encontrado pelo ID."})
        }

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const addCategoriaPizzaController= async (req,res)=>{

    try{//constrói o corpo adicionando uma categoria e a data atual
        const corpo={
            ...req.body,
            createdAt: Date.now()
        }
        //chama o serviço responsável pela ação
        return res.status(201).send(await pizzaService.addCategoriaPizzaService(req.params.id,corpo))

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err}`)
        return res.status(500).send({message:"erro no servidor tenta novamente mais tarde."})
    }
}

const removeCategoriaPizzaController= async (req,res)=>{

    try{//usa o serviço findById da pizza e categoria
        const categoria= await findCategoriaByIdService(req.body)
        const corpo= await pizzaService.findPizzaByIdService(req.params.id)

        //aqui verifica se a pizza existe junto com a categoria em ifs separados
        if(!categoria){
            return res.status(400).send({message:"categoria não foi encontrado pelo ID."})
        }

        if(!corpo){
            return res.status(400).send({message:"pizza não foi encontrado pelo ID."})
        }
        //chama o serviço responsável pela ação
        return res.send(await pizzaService.removeCategoriaPizzaService(req.params.id,req.body))

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
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