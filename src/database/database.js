const mongoose= require("mongoose")//LIB do mongoose

//faz a conexão com mongoDB usando uma variável de ambiente e exibi uma mensagem no console
function connectToDataBase(){
    mongoose.connect(process.env.URLDATABASE,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("mongo conectado")
    }).catch((err)=>{
        return console.log(`erro na conexão ${err}`)
    })

   
}

module.exports= connectToDataBase