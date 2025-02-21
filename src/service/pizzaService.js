const pizza = require("../model/pizza")

//CRUD completo utilizando o mongoose
const findPizzaByIdService= (id) =>{
    return pizza.findById(id)
}

const findPizzasAllService= (limit,offset) =>{
    return pizza.find().limit(limit).skip(offset)
}

const createPizzaService= (body) =>{
    return pizza.create(body)
}

const updatePizzaService= (id,body)=>{
    return pizza.findByIdAndUpdate(id,body,{returnDocument:"after"})
}

const deletePizzaService= (id)=>{
    return pizza.findByIdAndDelete(id)
}

/*
utiliza 'findOneAndUpdate' para muda um atributo de um objeto válido
os dois serviço addCategoriaPizzaService e removeCategoriaPizzaService
altera a categoria da pizza
*/
const addCategoriaPizzaService= (id,categoria)=>{
    return pizza.findOneAndUpdate(
        {
            _id:id
        },
        {
            $push:{
                categoria:{
                    _id: categoria._id,
                    createdAt: categoria.createdAt
                }
            }
        },
        {
            rawResult:true
        }
    )
}

const removeCategoriaPizzaService= (id,categoria)=>{
    return pizza.findOneAndUpdate(
        {
            _id: id
        },
        {
            $pull:{
                categoria:{
                    _id: categoria._id
                }
            }
        },
        {
            rawResult:true
        }
    )
}

module.exports={
    findPizzaByIdService,
    findPizzasAllService,
    createPizzaService,
    updatePizzaService,
    deletePizzaService,
    addCategoriaPizzaService,
    removeCategoriaPizzaService
}