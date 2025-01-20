const Express= require("express")
require("dotenv").config()//LIB para usa variável de ambiente
const cors= require("cors")//LIB que controla as permissões de origem de portas
const connectToDataBase= require("./src/database/database")//módulo para conecta ao mongoDB

const app= Express()

//módulos onde ficam as rotas
const usuario = require("./src/router/usuarioRouter")
const pizza = require("./src/router/pizzaRouter")
const categoria = require("./src/router/categoriaRouter")
const pedido = require("./src/router/pedidoRouter")
const docs = require("./src/router/docsRouter")

connectToDataBase()

const port= 3000


app.use(Express.json())//utiliza padrão json para comunicação api
app.use(cors(//definido qual origem e método utiliza
	{
		origin:"localhost:3001",
		methods:["GET","POST","PUT","DELETE","PATCH"]
	}
))

//os endpoints a se capturados
app.use("/usuario",usuario)
app.use("/pizza",pizza)
app.use("/categoria",categoria)
app.use("/pedido",pedido)
app.use("/docs",docs)

app.get("/",(req,res)=>{//se não for especificado nenhum endpoint uma mensagem aparece
	
	res.send("bem-vindo a pizzaria")
})

app.listen(port,()=>{//escutando nesse endereço de api
	
	console.log(`serviço rodando no http://localhost:${port}`)
})