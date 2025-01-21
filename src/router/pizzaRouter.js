const router= require("express").Router()//importa router
const pizzaController= require("../controller/pizzaController")//importa controller da pizza
const authMiddleware= require("../middleware/usuarioMiddleware")//importa autenticação
//importa validação
const {validaPizza,validaIdParams,valida_IdBody}= require("../middleware/validacaoMiddleware")
//importa paginação de resultado
const paginacao= require("../middleware/paginacaoMiddleware")

/*
endpoints do CRUD completo, addCategory e removeCategory onde alguns usa uma var como paramento,
todos utiliza validações antes de chama o controller
*/
router.get("/findById/:id",validaIdParams,authMiddleware,pizzaController.findByIdPizzaController)
router.get("/findAll",paginacao,authMiddleware,pizzaController.findAllPizzasController)

router.post("/create",authMiddleware,validaPizza,pizzaController.createPizzaController)
router.post("/addCategory/:id",authMiddleware,validaIdParams,valida_IdBody,pizzaController.addCategoriaPizzaController)

router.put("/update/:id",authMiddleware,validaIdParams,validaPizza,pizzaController.updatePizzaController)

router.delete("/delete/:id",authMiddleware,validaIdParams,pizzaController.deletePizzaController)
router.delete("/removeCategory/:id",authMiddleware,validaIdParams,pizzaController.removeCategoriaPizzaController)

module.exports= router