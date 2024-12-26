const router= require("express").Router()
const authmiddleware= require("../middleware/usuarioMiddleware")
const pedidoController= require("../controller/pedidoController")
const {validaPedido,validaIdParams,validaPizzaCarrinhoPedido}= require("../middleware/validacaoMiddleware")
const paginacao= require("../middleware/paginacaoMiddleware")

router.get("/findById/:id",authmiddleware,validaIdParams,pedidoController.findPedidoByIdController)
router.get("/findAll",paginacao,authmiddleware,pedidoController.findAllPedidoController)

router.post("/create",authmiddleware,validaPizzaCarrinhoPedido,validaPedido,pedidoController.createPedidoController)

router.delete("/delete/:id",authmiddleware,validaIdParams,pedidoController.deletePedidoController)

router.patch("/updateStatus/:id",authmiddleware,validaIdParams,pedidoController.updateStatusPedidoController)

module.exports= router