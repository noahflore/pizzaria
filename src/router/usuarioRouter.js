const router= require("express").Router()
const usuarioController= require("../controller/usuarioController")
const authMiddleware= require("../middleware/usuarioMiddleware")
const {validaUsuario,validaEndereco,validaIdParams,valida_IdBody,valida_IdAddress,validaLogin}= require("../middleware/validacaoMiddleware")
const paginacao= require("../middleware/paginacaoMiddleware")

router.get('/findById/:id',validaIdParams,authMiddleware,usuarioController.findByIdUserController)
router.get('/findAll',authMiddleware,paginacao,usuarioController.findAllUsersController)

router.post('/login',validaLogin,usuarioController.usuarioLogin)
router.post('/create',validaUsuario,usuarioController.createUserController)
router.post('/addAddress/:id',authMiddleware,validaIdParams,validaEndereco,usuarioController.addAddressController)
router.post('/addFavPizza/:id',authMiddleware,validaIdParams,valida_IdBody,usuarioController.addFavProductController)

router.put('/update/:id',validaIdParams,authMiddleware,validaUsuario,usuarioController.updateUserController)

router.delete('/removeUser/:id',validaIdParams,authMiddleware,usuarioController.deleteUserController)
router.delete('/removeFavPizza/:id',validaIdParams,authMiddleware,usuarioController.removeFavProductController)
router.delete('/removeAddress',authMiddleware,valida_IdBody,valida_IdAddress,usuarioController.removeAddressController)

module.exports= router