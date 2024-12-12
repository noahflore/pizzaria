const mongoose= require("mongoose")

const carrinhoSchema= new mongoose.Schema({
    pizzas:[
        {
            _id:{type:mongoose.Schema.Types.ObjectId,required:true,unique:true,ref:"pizzas"},
            quantidade:{type:Number,required:true,default:1}
        }
    ],
    createdAt:{type:Date,required:true,default:Date.now()},
    precoTotal:{type:Number,required:true},
    frete:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,unique:false,required:true,ref:"usuarios"}
})

const carrinhoNovo= mongoose.model("carrinhos",carrinhoSchema)

module.exports= carrinhoNovo