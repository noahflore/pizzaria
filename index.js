const Express= require("express")
require("dotenv").config()
const cors= require("cors")
const connectToDataBase= require("./src/database/database")

const app= Express()
const usuario = require("./src/router/usuarioRouter")
const produto = require("./src/router/produto.router")
//const categoria = require("./src/router/categoria.router")
const carrinho = require("./src/router/carrinho.router")
const pedido = require("./src/router/pedido.router")
const docs = require("./src/router/docs.router")

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
app.use("/produto",produto)
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