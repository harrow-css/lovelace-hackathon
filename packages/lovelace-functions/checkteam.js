exports.main = () => {
    // check the jwt token    
    checkJWT (token);
}


function checkJWT (token) {
    var jwt = require('jsonwebtoken');
    // verify a token symmetric - synchronous
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded.foo) // bar

    return ;
}