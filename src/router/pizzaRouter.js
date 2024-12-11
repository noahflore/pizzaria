const router= require("express").Router()
const pizzaController= require("../controller/pizzaController")
const authMiddleware= require("../middleware/usuario.middleware")
const {validaProduto,validaIdParams,valida_IdBody}= require("../middleware/validacao.middleware")
const paginacao= require("../middleware/paginacao.middleware")

router.get("/find/:id",validaIdParams,authMiddleware,pizzaController.findByIdPizzaController)
router.get("/findAll",paginacao,authMiddleware,pizzaController.findAllPizzasController)

router.post("/create",authMiddleware,validaProduto,pizzaController.createPizzaController)
router.post("/addCategoria/:id",authMiddleware,validaIdParams,valida_IdBody,pizzaController.addCategoriaPizzaController)

router.put("/update/:id",validaIdParams,authMiddleware,validaProduto,pizzaController.updatePizzaController)

router.delete("/delete/:id",validaIdParams,authMiddleware,pizzaController.deletePizzaController)
router.delete("/removeCategoria/:id",validaIdParams,authMiddleware,pizzaController.removeCategoriaPizzaController)

module.exports= router