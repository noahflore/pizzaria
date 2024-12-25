const router= require("express").Router()
const usuarioController= require("../controller/usuarioController")
const authMiddleware= require("../middleware/usuarioMiddleware")
const {validaUsuario,validaEndereco,validaIdParams,valida_IdBody,valida_IdAddress,validaLogin}= require("../middleware/validacaoMiddleware")
const paginacao= require("../middleware/paginacaoMiddleware")

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