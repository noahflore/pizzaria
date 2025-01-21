const router= require("express").Router()//importa router
const authmiddleware= require("../middleware/usuarioMiddleware")//importa autenticação
//importa controller da categoria
const categoriaController= require("../controller/categoriaController")
//importa validação
const {validaCategoria,validaIdParams}= require("../middleware/validacaoMiddleware")
//importa paginação de resultado
const paginacao= require("../middleware/paginacaoMiddleware")

/*
endpoints do CRUD completo onde alguns usa uma var como paramento, todos utiliza
validações antes de chama o controller
*/
router.get("/findById/:id",authmiddleware,validaIdParams,categoriaController.findCategoriaByIdController)
router.get("/findAll",paginacao,authmiddleware,categoriaController.findAllCategoriaController)

router.post("/create",authmiddleware,validaCategoria,categoriaController.createCategoriaController)

router.put("/update/:id",authmiddleware,validaIdParams,validaCategoria,categoriaController.updateCategoriaController)

router.delete("/delete/:id",authmiddleware,validaIdParams,categoriaController.deleteCategoriaController)

module.exports= router