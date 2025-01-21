const router= require("express").Router()//importa router
//importa controller do usuário
const usuarioController= require("../controller/usuarioController")
const authMiddleware= require("../middleware/usuarioMiddleware")//importa autenticação
//importa validação
const {validaUsuario,validaEndereco,validaIdParams,valida_IdBody,valida_IdAddress,validaLogin}= require("../middleware/validacaoMiddleware")
//importa paginação de resultado
const paginacao= require("../middleware/paginacaoMiddleware")

/*
endpoints do CRUD completo, addAddress, removeAddress, addFavPizza e removeFavPizza
onde alguns usa uma var como paramento, todos utiliza validações antes de chama o controller
*/
router.get('/findById/:id',authMiddleware,validaIdParams,usuarioController.findByIdUserController)
router.get('/findAll',authMiddleware,paginacao,usuarioController.findAllUsersController)

router.post('/login',validaLogin,usuarioController.usuarioLogin)
router.post('/create',validaUsuario,usuarioController.createUserController)
router.post('/addAddress/:id',authMiddleware,validaIdParams,validaEndereco,usuarioController.addAddressController)
router.post('/addFavPizza/:id',authMiddleware,validaIdParams,valida_IdBody,usuarioController.addFavPizzaController)

router.put('/update/:id',authMiddleware,validaIdParams,validaUsuario,usuarioController.updateUserController)

router.delete('/removeUser/:id',authMiddleware,validaIdParams,usuarioController.deleteUserController)
router.delete('/removeFavPizza/:id',authMiddleware,validaIdParams,valida_IdBody,usuarioController.removeFavPizzaController)
router.delete('/removeAddress',authMiddleware,valida_IdBody,valida_IdAddress,usuarioController.removeAddressController)

module.exports= router