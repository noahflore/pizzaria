const mongoose = require("mongoose")

const categoriaSchema= new mongoose.Schema({
    nome:{type:String,unique:true,required:true},
    createdAt:{type:Date,required:true,default:Date.now()}
})

const categoriaNovo= mongoose.model("categorias",categoriaSchema)

module.exports= categoriaNovo