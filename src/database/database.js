const mongoose= require("mongoose")


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