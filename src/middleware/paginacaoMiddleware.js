module.exports= (req,res,next)=>{
    //o 'req.query' é desmontado em duas let 'limit' e 'offset'
    let {limit,offset}= req.query

    //converte para tipo NUMBER
    limit= Number(limit)
    offset= Number(offset)

    //usa um if ternário para caso a let esteja vázio recebe um valor
    !limit ? limit=10: null
    !offset ? offset=0: null

    //o 'req.query' recebe de volta o 'limit' e 'offset'
    req.query.limit= limit
    req.query.offset= offset

    return next()
}