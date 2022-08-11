const jwt = require("jsonwebtoken");

const jwt_secret = "hellothere!";
const fetchUser = async (req,res,next)=>{

    const token = req.header("auth-token");
    if(!token)
    {
        return res.status(401).send({error:"try to login with valid token!!"});
    }
    try{
    const data = await jwt.verify(token,jwt_secret);
    req.user = data.user;
    }catch(e){
        console.log(e);
        return res.status(401).send({error:"try to login with valid token!!"});
    }   
    next();
}

module.exports = fetchUser;