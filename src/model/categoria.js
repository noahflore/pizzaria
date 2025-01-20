const mongoose = require("mongoose")

//montando um Schema típico para mongoDB utilizando o mongoose LIB
const categoriaSchema= new mongoose.Schema({
    nome:{type:String,unique:true,required:true},
    createdAt:{type:Date,required:true,default:Date.now()}
})

//usando o Schema para criar um modelo mongoDB
const categoriaNovo= mongoose.model("categorias",categoriaSchema)

module.exports= categoriaNovo