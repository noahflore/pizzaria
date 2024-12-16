const router= require("express").Router()
const authmiddleware= require("../middleware/usuarioMiddleware")
const carrinhoController= require("../controller/carrinhoController")
const {validaCarrinho,validaIdParams,validaPizzaCarrinhoPedido}= require("../middleware/validacaoMiddleware")
const paginacao= require("../middleware/paginacaoMiddleware")

router.get("/findById/:id",validaIdParams,authmiddleware,carrinhoController.findCarrinhoByIdController)
router.get("/findAll",paginacao,authmiddleware,carrinhoController.findAllCarrinhoController)

router.post("/create",authmiddleware,validaPizzaCarrinhoPedido,validaCarrinho,carrinhoController.createCarrinhoController)

router.put("/update/:id",validaIdParams,authmiddleware,validaCarrinho,carrinhoController.updateCarrinhoController)

router.delete("/delete/:id",validaIdParams,authmiddleware,carrinhoController.deleteCarrinhoController)

module.exports= router