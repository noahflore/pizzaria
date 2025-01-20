const mongoose= require("mongoose")

//montando um Schema típico para mongoDB utilizando o mongoose LIB
const pedidoSchema= new mongoose.Schema({
    pizzas:[
        {
            _id:{type:mongoose.Schema.Types.ObjectId,required:true,unique:true,ref:"pizzas"},
            quantidade:{type:Number,required:true,default:1}
        }
    ],
    createdAt:{type:Date,required:true,default:Date.now()},
    precoTotal:{type:Number,required:true},
    frete:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,unique:false,ref:"usuarios"},
    concluido:{type:Boolean,required:true,default:false}
})

//usando o Schema para criar um modelo mongoDB
const pedidoNovo= mongoose.model("pedidos",pedidoSchema)

module.exports= pedidoNovo