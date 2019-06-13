const jwt = require('jsonwebtoken');


//This way of module.exports allows me to treat it like a middleware without making it a post or something
module.exports = (req,res)=>{

    //This split is made because de bearer is created automaticly and it has to be removed before i read it
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "secret", function(err, retur) {
    
        if(err){
            res.status(404).json({
                message: 'Wrong Token'
            })
        }else{
            res.status(200).json({
                message: 'Auth succesfull',
                decoded: retur
            })
        }
  });

}
