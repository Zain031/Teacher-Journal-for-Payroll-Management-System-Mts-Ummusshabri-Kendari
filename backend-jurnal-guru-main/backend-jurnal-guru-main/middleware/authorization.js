class Authorization {
    static async admin(req,res,next){
        try{
            if(req.user.role.toLowerCase() === 'admin'){
                next()
            }
            else{
                throw {nama: 'User is not admin'}
            }
        }
        catch(err){
            next(err)
        }
    }
    static async teacher(req,res,next){
        try{
            console.log("GUUURUURU",req.user.role)
            if(req.user.role.toLowerCase() === 'teacher'){
                next()
            }
            else{
                throw {nama: 'User is not teacher'}
            }
        }
        catch(err){
            next(err)
        }
    }
}

export default Authorization