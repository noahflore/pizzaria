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

const addFavProductService= (id,produto)=>{
    return usuario.findOneAndUpdate(
        {
        
            _id: id
        },
        {
            $push:{
                produtos_fav:{
                    _id: produto._id
                }
            }
        },
        {
            rawResult:true
        }
    )
}

const removeFavProductService= (id,produto)=>{
    return usuario.findOneAndUpdate(
        {
        
            _id: id
        },
        {
            $pull:{
                produtos_fav:{
                    _id: produto._id
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
    addFavProductService,
    removeFavProductService
}