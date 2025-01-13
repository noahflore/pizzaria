const userService= require("../service/usuarioService")
const {findPizzaByIdService}= require("../service/pizzaService")
const authService= require("../service/authService")
const bcrypt=require("bcrypt")

const findByIdUserController= async (req,res)=>{
    try{

        const user= await userService.findByIdServiceUsuario(req.params.id)

        if(!user){
            return res.status(404).send({message:"usuario não encontrado."})
        }

        return res.status(200).send(user)

    }catch(err){

        if(err.kind=="ObjectId"){
            console.log(err.kind=="ObjectId")
            res.status(400).send({message:"erro no ID verifica se foi enviado corretamente."})
        }

        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const findAllUsersController= async (req,res)=>{
    try{

        return res.status(200).send(await userService.findAllServiceUsuario(req.query.limit,req.query.offset))

    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const createUserController= async (req,res)=>{
    try{
        return res.status(201).send(await userService.createServiceUsuario(req.body))

    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const updateUserController= async (req,res)=>{
    try{
        const body= req.body

        return res.status(201).send(await userService.updateServiceUsuario(req.params.id,body))
    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const deleteUserController= async (req,res)=>{
    try{

        const deletedUser= await userService.deleteServiceUsuario(req.params.id)

        if(deletedUser == null){
           return res.status(400).send({message:"nenhum usuario foi encontrado."})
           
        }else{
            return res.status(200).send({message:"usuario deletado com sucesso."})
        }

    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const addAddressController= async (req,res)=>{
    try{
        let endereco = await Promise.all(
            req.body.map(async (value,key)=>{
                return await userService.addAddressService(req.params.id,value)
                
            })
        )
        
        if(endereco !=null && endereco.value == null){
            return res.status(201).send({message:"endereço criado com sucesso."})
        }else{
            return res.status(400).send({message:"erro na criação do endereço."})
        }

    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const addFavPizzaController= async (req,res)=>{
    try{
        const pizza= await findPizzaByIdService(req.body)
        const corpo= await userService.findByIdServiceUsuario(req.params.id)

        if(!pizza){
            return res.status(400).send({message:"objeto não foi encontrado pelo ID."})
        }
        
        if(!corpo){
            return res.status(400).send({message:"usuário não foi encontrado pelo ID."})
        }
        return res.status(200).send(await userService.addFavPizzaService(req.params.id,req.body))

    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const removeAddressController= async (req,res)=>{
    try{
        
        const endereco = await userService.removeAddressService(req.body._id,req.body.addressId)
        let found=false
        
        endereco.enderecos.map((valor,chave)=>{
            if(valor._id==req.body.addressId){
                found = true
            }
        })

        if(found){
            return res.status(201).send({message:"endereço removido com sucesso."})
        }else{
            return res.status(400).send({message:"erro ao deleta o endereço."})
        }
    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const removeFavPizzaController= async (req,res)=>{
    try{
        const pizza= await findPizzaByIdService(req.body)
        const corpo= await userService.findByIdServiceUsuario(req.params.id)

        if(!pizza){
            return res.status(400).send({message:"objeto não foi encontrado pelo ID."})
        }
        
        if(!corpo){
            return res.status(400).send({message:"usuário não foi encontrado pelo ID."})
        }
       return res.status(200).send(await userService.removeFavPizzaService(req.params.id,req.body))

    }catch(err){
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const usuarioLogin= async (req,res)=>{//aqui utilizei outro tipo de verificação do email e senha

	try{
		const {email, senha}= req.body
		const user= await authService.loginService(email)

		if(!user){
            console.log(`erro de login: ${user}`)
			return res.status(400).send({message:"erro no login ou senha: verifica se ambos estão no formato string e foi digitado corretamente."})
		}
        
		if(!await bcrypt.compare(senha,user.senha)){
            console.log(`erro de login: senha do sistema ${user.senha} ${typeof(user.senha)} | ${typeof(senha)}`)
			return res.status(400).send({message:"erro no login ou senha: verifica se ambos estão no formato string e foi digitado corretamente."})
		}

		const token= authService.generateToken(user,process.env.SECRETKEY)
		res.status(200).send({
			user,
			token
		})
	}catch(err){
		console.log(`erro: ${err}`)
		return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
	}
}


module.exports= {
    findByIdUserController,
    findAllUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
    addAddressController,
    addFavPizzaController,
    removeAddressController,
    removeFavPizzaController,
    usuarioLogin
}