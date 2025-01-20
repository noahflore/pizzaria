const mongoose=require("mongoose")
const bcrypt= require("bcrypt")

//montando um Schema típico para mongoDB utilizando o mongoose LIB
const usuarioSchema=new mongoose.Schema({
    nome:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    senha:{type:String,required:true},
    imagem:{type:String,required:true},
    enderecos:[
        {
            rua:{type:String,require:true},
            numero:{type:Number,require:true},
            bairro:{type:String,required:true},
            complemento:{type:String},
            cep:{type:String,require:true,unique:true},
            createdAt:{type:Date,require:true,default:Date.now()},
        }
    ],
    createdAt:{type:Date,require:true,default:Date.now()},
    pizzas_fav:[
        {
            _id:{type:mongoose.Schema.Types.ObjectId,unique:true,ref:"pizzas"},
            createdAt:{type:Date,default:Date.now()}
        }
    ],
    admin:{type:Boolean,require:true,default:false}
})

/* 
o método 'pre' é um tipo de middleware e ele salva algo no usuarioSchema antes de criar
no caso o bcrypt criar um hash para senha o qual foi fornecido pelo usuário durante o cada
stro
*/
usuarioSchema.pre("save",async function (next){
    if(this.senha){
        this.senha= await bcrypt.hash(this.senha,10)
    }
    next()
})

//usando o Schema para criar um modelo mongoDB
const novoUsuario=mongoose.model("usuarios",usuarioSchema)

module.exports = novoUsuario