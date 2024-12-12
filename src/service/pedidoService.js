const pedido= require("../model/pedido")

const findPedidoByIdService= (id)=>{
    return pedido.findById(id)
}

const findAllPedidoService= (limit,offset)=>{
    return pedido.find().limit(limit).skip(offset)
}

const createPedidoService= (body)=>{
    return pedido.create(body)
}

const deletePedidoService= (id)=>{
    return pedido.findByIdAndDelete(id)
}

const updateStatusPedidoService= (id)=>{
    return pedido.findOneAndUpdate({_id: id},{$set:{concluido: true}},{rawResult:true})
}

module.exports={
    findPedidoByIdService,
    findAllPedidoService,
    createPedidoService,
    deletePedidoService,
    updateStatusPedidoService
}