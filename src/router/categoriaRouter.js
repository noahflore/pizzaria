const router= require("express").Router()
const authmiddleware= require("../middleware/usuarioMiddleware")
const categoriaController= require("../controller/categoriaController")
const {validaCategoria,validaIdParams}= require("../middleware/validacaoMiddleware")
const paginacao= require("../middleware/paginacaoMiddleware")

router.get("/findById/:id",validaIdParams,authmiddleware,categoriaController.findCategoriaByIdController)
router.get("/findAll",paginacao,authmiddleware,categoriaController.findAllCategoriaController)

router.post("/create",authmiddleware,validaCategoria,categoriaController.createCategoriaController)

router.put("/update/:id",validaIdParams,authmiddleware,validaCategoria,categoriaController.updateCategoriaController)

router.delete("/delete/:id",validaIdParams,authmiddleware,categoriaController.deleteCategoriaController)

module.exports= router