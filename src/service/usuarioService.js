const usuario= require("../model/usuario")

const findAllServiceUsuario= (limit,offset)=>{
    return usuario.find().limit(limit).skip(offset)
}

const findByIdServiceUsuario= (id)=>{
    return usuario.findById(id)
}

const createServiceUsuario= (body)=>{
    return usuario.create(body)
}

const updateServiceUsuario= (id,body)=>{
    return usuario.findByIdAndUpdate(id,body,{returnDocument:"after"})
}

const deleteServiceUsuario= (id)=>{
    return usuario.findByIdAndDelete(id)
}

const addAddressService= (id,endereco)=>{
  return  usuario.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push:{
                enderecos: endereco
            }
        },
        {
            rawResult:true
        }
    )
}

const removeAddressService= (id,addressId)=>{
    return  usuario.findOneAndUpdate(
        {
            _id: id
        },
        {
            $pull:{
                enderecos: {
                    _id: addressId
                }
            }
        },
        {
            rawResult:true
        }
    )
}

const addFavPizzaService= (id,pizza)=>{
    return usuario.findOneAndUpdate(
        {
        
            _id: id
        },
        {
            $push:{
                pizzas_fav:{
                    _id: pizza._id
                }
            }
        },
        {
            rawResult:true
        }
    )
}

const removeFavPizzaService= (id,pizza)=>{
    return usuario.findOneAndUpdate(
        {
        
            _id: id
        },
        {
            $pull:{
                produtos_fav:{
                    _id: pizza._id
                }
            }
        },
        {
            rawResult:true
        }
    )
}

module.exports={
    findAllServiceUsuario,
    findByIdServiceUsuario,
    createServiceUsuario,
    updateServiceUsuario,
    deleteServiceUsuario,
    addAddressService,
    removeAddressService,
    addFavPizzaService,
    removeFavPizzaService
}