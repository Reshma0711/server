

const admin=async (req,res)=>{
    return res.status(201).json({
        "message":"Welcome admin"
    })
}


const manager=async (req,res)=>{
    return res.status(201).json({
        "message":"Welcome manager"
    })
}

const user=async (req,res)=>{
    return res.status(201).json({
        "message":"Welcome user"
    })
}


module.exports= {admin,manager,user}