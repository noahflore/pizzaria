const userService= require("../service/usuarioService")//importa o serviço do usuário
//importa apenas o findById da pizza
const {findPizzaByIdService}= require("../service/pizzaService")
const authService= require("../service/authService")//importa o serviço de autenticação
const bcrypt=require("bcrypt")//importa LIB bcrypt

const findByIdUserController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        const user= await userService.findByIdServiceUsuario(req.params.id)

        if(!user){//exibi uma mensagem quando o usuário não for encontrado
            return res.status(404).send({message:"usuario não encontrado."})
        }

        return res.status(200).send(user)
    }catch(err){

        //verifica se o ID do objeto foi colocado corretamente
        if(err.kind=="ObjectId"){
            console.log(err.kind=="ObjectId")
            res.status(400).send({message:"erro no ID, verifica se foi enviado corretamente."})
        }

        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const findAllUsersController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.status(200).send(await userService.findAllServiceUsuario(req.query.limit,req.query.offset))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const createUserController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.status(201).send(await userService.createServiceUsuario(req.body))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const updateUserController= async (req,res)=>{
    try{//chama o serviço responsável pela ação
        return res.status(201).send(await userService.updateServiceUsuario(req.params.id,req.body))
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const deleteUserController= async (req,res)=>{
    try{

        //chama o serviço responsável pela ação
        const deletedUser= await userService.deleteServiceUsuario(req.params.id)

        //verifica se o usuário foi deletado ou não encontrado
        if(deletedUser == null){
           return res.status(400).send({message:"nenhum usuario foi encontrado."})
           
        }else{
            return res.status(200).send({message:"usuario deletado com sucesso."})
        }

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const addAddressController= async (req,res)=>{
    try{
/*
aqui é gerado uma promessa onde garante que as chamadas seja finalizada 
antes de seguir o fluxo do códgo
*/
        let endereco = await Promise.all(
            req.body.map(async (value,key)=>{
                //chama o serviço responsável pela ação
                return await userService.addAddressService(req.params.id,value)
                
            })
        )
        
        //verifica se o endereço foi criado e exibi uma mensagem ao usuário
        if(endereco !=null && endereco.value == null){
            return res.status(201).send({message:"endereço criado com sucesso."})
        }else{
            return res.status(400).send({message:"erro na criação do endereço."})
        }

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const addFavPizzaController= async (req,res)=>{
    try{//usa o serviço findById da pizza e usuário
        const pizza= await findPizzaByIdService(req.body)
        const corpo= await userService.findByIdServiceUsuario(req.params.id)

        //aqui verifica se a pizza existe junto com o usuário em ifs separados
        if(!pizza){
            return res.status(400).send({message:"objeto não foi encontrado pelo ID."})
        }
        
        if(!corpo){
            return res.status(400).send({message:"usuário não foi encontrado pelo ID."})
        }
        //chama o serviço responsável pela ação
        return res.status(200).send(await userService.addFavPizzaService(req.params.id,req.body))

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const removeAddressController= async (req,res)=>{
    try{
        
        //chama o serviço responsável pela ação
        const endereco = await userService.removeAddressService(req.body._id,req.body.addressId)
        let found=false
        
        //percorre o array de endereços e se ID for igual do 'req.body.addressId'
        endereco.enderecos.map((valor,chave)=>{
            if(valor._id==req.body.addressId){
                found = true
            }
        })

        //se o let 'found' for true então o endereço foi removido caso contraio ocorreu um erro
        if(found){
            return res.status(201).send({message:"endereço removido com sucesso."})
        }else{
            return res.status(400).send({message:"erro ao deleta o endereço."})
        }
    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const removeFavPizzaController= async (req,res)=>{
    try{//usa o serviço findById da pizza e usuário
        const pizza= await findPizzaByIdService(req.body)
        const corpo= await userService.findByIdServiceUsuario(req.params.id)

        //aqui verifica se a pizza existe junto com o usuário em ifs separados
        if(!pizza){
            return res.status(400).send({message:"objeto não foi encontrado pelo ID."})
        }
        
        if(!corpo){
            return res.status(400).send({message:"usuário não foi encontrado pelo ID."})
        }
        //chama o serviço responsável pela ação
       return res.status(200).send(await userService.removeFavPizzaService(req.params.id,req.body))

    }catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
        console.log(`erro: ${err.message}`)
       return res.status(500).send({message:"erro no servidor tente novamente mais tarde."})
    }
}

const usuarioLogin= async (req,res)=>{//aqui utilizei outro tipo de verificação do email e senha

	try{//o 'req.body' é desmontado em duas const 'email' e 'senha'
		const {email, senha}= req.body
        //chama o serviço responsável pela ação
		const user= await authService.loginService(email)

        //verifica se o usuário não existe e retorna uma mensagem ao usuário e console
		if(!user){
            console.log(`erro de login: ${user}`)
			return res.status(400).send({message:"erro no login ou senha: verifica se ambos estão no formato string e foi digitado corretamente."})
		}
        
        //compara se o hash da senha do usuário lá do banco de dados é igual a senha passada
		if(!await bcrypt.compare(senha,user.senha)){
            //exibi uma mensagem ao usuário e no console
            console.log(`erro de login: senha do sistema ${user.senha} ${typeof(user.senha)} | ${typeof(senha)}`)
			return res.status(400).send({message:"erro no login ou senha: verifica se ambos estão no formato string e foi digitado corretamente."})
		}

        //criar um token e coloca no usuário logado, usando uma var de ambiente
		const token= authService.generateToken(user,process.env.SECRETKEY)
		res.status(200).send({
			user,
			token
		})
	}catch(err){
        //mensagem de erro aparece no console e uma mensagem generica é exibida ao usuário
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