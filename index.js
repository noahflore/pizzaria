const Express= require("express")
require("dotenv").config()
const cors= require("cors")
const connectToDataBase= require("./src/database/database")

const app= Express()
const usuario = require("./src/router/usuarioRouter")
const pizza = require("./src/router/pizzaRouter")
const categoria = require("./src/router/categoriaRouter")
const carrinho = require("./src/router/carrinhoRouter")
const pedido = require("./src/router/pedidoRouter")
const docs = require("./src/router/docsRouter")

connectToDataBase()

const port= 3000


app.use(Express.json())
app.use(cors(
	{
		origin:"localhost:3001",
		methods:["GET","POST","PUT","DELETE","PATCH"]
	}
))
app.use("/usuario",usuario)
app.use("/pizza",pizza)
app.use("/categoria",categoria)
app.use("/carrinho",carrinho)
app.use("/pedido",pedido)
app.use("/docs",docs)

app.get("/",(req,res)=>{
	
	res.send("bem-vindo a pizzaria")
})

app.listen(port,()=>{
	
	console.log(`serviço rodando no http://localhost:${port}`)
})