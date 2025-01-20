const mongoose= require("mongoose")

//montando um Schema típico para mongoDB utilizando o mongoose LIB
const pizzaScrema= new mongoose.Schema({
    nome: {type: String, unique:true,required:true},
    descricao: {type: String,required:true},
    precoUnitario: {type:Number,required:true},
    imagem: {type: String,required:true},
    categoria:[
        {
            _id: {type:mongoose.Schema.Types.ObjectId, required:true,ref:"categorias"},
            createdAt: {type:Date,required:true,default:Date.now()}
        }
    ]
})

//usando o Schema para criar um modelo mongoDB
const pizza = mongoose.model("pizzas",pizzaScrema)

module.exports =  pizza