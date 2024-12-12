const router= require("express").Router()
const authmiddleware= require("../middleware/usuario.middleware")
const pedidoController= require("../controller/pedidoController")
const {validaPedido,validaIdParams,validaProdutoCarrinhoPedido}= require("../middleware/validacao.middleware")
const paginacao= require("../middleware/paginacao.middleware")

router.get("/findById/:id",validaIdParams,authmiddleware,pedidoController.findPedidoByIdController)
router.get("/findAll",paginacao,authmiddleware,pedidoController.findAllPedidoController)

router.post("/create",authmiddleware,validaProdutoCarrinhoPedido,validaPedido,pedidoController.createPedidoController)

router.delete("/delete/:id",validaIdParams,authmiddleware,pedidoController.deletePedidoController)

router.patch("/updateStatus/:id",validaIdParams,authmiddleware,pedidoController.updateStatusPedidoController)

module.exports= router