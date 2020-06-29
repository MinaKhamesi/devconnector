const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req,res,next)=>{
    //get token from header
    const token = req.header('x-auth-token');
    //check if token doesnt exist
    if(!token){
        return res.status(401).json({msg:'Not Authorized!'})
    }
    //validate token
    try {
        const payload = await jwt.verify(token,config.get('jwtSecret'));
        req.user = payload.user;
        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:'token not valid'})
    }
    
}

module.exports = auth;