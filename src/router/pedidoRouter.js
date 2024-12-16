const router= require("express").Router()
const authmiddleware= require("../middleware/usuarioMiddleware")
const pedidoController= require("../controller/pedidoController")
const {validaPedido,validaIdParams,validaPizzaCarrinhoPedido}= require("../middleware/validacaoMiddleware")
const paginacao= require("../middleware/paginacaoMiddleware")

router.get("/findById/:id",validaIdParams,authmiddleware,pedidoController.findPedidoByIdController)
router.get("/findAll",paginacao,authmiddleware,pedidoController.findAllPedidoController)

router.post("/create",authmiddleware,validaPizzaCarrinhoPedido,validaPedido,pedidoController.createPedidoController)

router.delete("/delete/:id",validaIdParams,authmiddleware,pedidoController.deletePedidoController)

router.patch("/updateStatus/:id",validaIdParams,authmiddleware,pedidoController.updateStatusPedidoController)

module.exports= router