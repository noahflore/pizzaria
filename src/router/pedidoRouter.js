const router= require("express").Router()//importa router
const authmiddleware= require("../middleware/usuarioMiddleware")//importa autenticação
//importa controller do pedido
const pedidoController= require("../controller/pedidoController")
//importa validação
const {validaPedido,validaIdParams,validaPizzaCarrinhoPedido}= require("../middleware/validacaoMiddleware")
//importa paginação de resultado
const paginacao= require("../middleware/paginacaoMiddleware")

/*
endpoints do CRUD completo onde alguns usa uma var como paramento, todos utiliza
validações antes de chama o controller
*/
router.get("/findById/:id",authmiddleware,validaIdParams,pedidoController.findPedidoByIdController)
router.get("/findAll",paginacao,authmiddleware,pedidoController.findAllPedidoController)

router.post("/create",authmiddleware,validaPizzaCarrinhoPedido,validaPedido,pedidoController.createPedidoController)

router.delete("/delete/:id",authmiddleware,validaIdParams,pedidoController.deletePedidoController)

router.patch("/updateStatus/:id",authmiddleware,validaIdParams,pedidoController.updateStatusPedidoController)

module.exports= router