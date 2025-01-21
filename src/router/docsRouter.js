const router= require("express").Router()//importa router
const swaggerUi= require("swagger-ui-express")//importa interface de navegador para express
const swaggerDocument= require("../../swagger.json")//importa documentação estilo swagger

router.use("/api-doc",swaggerUi.serve)//carrega o swagger.json quando chamado
//carrega uma formatação html quando chamado
router.get("/api-doc",swaggerUi.setup(swaggerDocument))

module.exports= router