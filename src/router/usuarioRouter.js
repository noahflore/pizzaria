const router= require("express").Router()
const usuarioController= require("../controller/usuario.controller")
const authMiddleware= require("../middleware/usuario.middleware")
const {validaUsuario,validaEndereco,validaIdParams,valida_IdBody,validaLogin}= require("../middleware/validacao.middleware")
const paginacao= require("../middleware/paginacao.middleware")

router.get('/findById/:id',validaIdParams,authMiddleware,usuarioController.findByIdUserController)
router.get('/findAll',paginacao,usuarioController.findAllUsersController)

router.post('/login',validaLogin,usuarioController.usuarioLogin)
router.post('/create',validaUsuario,usuarioController.createUserController)
router.post('/addAddress/:id',authMiddleware,validaIdParams,validaEndereco,usuarioController.addAddressController)
router.post('/addFavProduct/:id',authMiddleware,validaIdParams,valida_IdBody,usuarioController.addFavProductController)

router.put('/update/:id',validaIdParams,authMiddleware,validaUsuario,usuarioController.updateUserController)

router.delete('/removeUser/:id',validaIdParams,authMiddleware,usuarioController.deleteUserController)
router.delete('/removeFavProduct/:id',validaIdParams,authMiddleware,usuarioController.removeFavProductController)
router.delete('/removeAddress',authMiddleware,usuarioController.removeAddressController)

module.exports= router