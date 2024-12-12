const router= require("express").Router()
const authmiddleware= require("../middleware/usuario.middleware")
const carrinhoController= require("../controller/carrinhoController")
const {validaCarrinho,validaIdParams,validaProdutoCarrinhoPedido}= require("../middleware/validacao.middleware")
const paginacao= require("../middleware/paginacao.middleware")

router.get("/findById/:id",validaIdParams,authmiddleware,carrinhoController.findCarrinhoByIdController)
router.get("/findAll",paginacao,authmiddleware,carrinhoController.findAllCarrinhoController)

router.post("/create",authmiddleware,validaProdutoCarrinhoPedido,validaCarrinho,carrinhoController.createCarrinhoController)

router.put("/update/:id",validaIdParams,authmiddleware,validaCarrinho,carrinhoController.updateCarrinhoController)

router.delete("/delete/:id",validaIdParams,authmiddleware,carrinhoController.deleteCarrinhoController)

module.exports= router