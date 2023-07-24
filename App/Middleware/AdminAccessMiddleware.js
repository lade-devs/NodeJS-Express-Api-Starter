const {response} = require('../../Helpers/response');

exports.adminAccess = {
    handle(req, res, next){
        if ( req.user.role !== 'admin' ){
            return res.send(response.fail('Unauthorized access'));
        }
        next();
    },
}