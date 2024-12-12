const carrinho= require("../model/carrinho")

const findCarrinhoByIdService= (id)=>{
    return carrinho.findById(id)
}

const findAllCarrinhoService= (limit,offset)=>{
    return carrinho.find().limit(limit).skip(offset)
}

const createCarrinhoService= (body)=>{
    return carrinho.create(body)
}

const updateCarrinhoService= (id,body)=>{
    return carrinho.findByIdAndUpdate(id,body,{returnDocument:"after"})
}

const deleteCarrinhoService= (id)=>{
    return carrinho.findByIdAndDelete(id)
}

module.exports={
    findCarrinhoByIdService,
    findAllCarrinhoService,
    createCarrinhoService,
    updateCarrinhoService,
    deleteCarrinhoService
}