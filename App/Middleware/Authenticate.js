const {response} = require('../../Helpers/response');

const {query} = require('../../Database/Query');

exports.authenticate = {

    async handle(req, res, next){

        const AuthToken = req.headers.authorization;

        // check if bearer token is present in request
        if ( ! ( AuthToken && AuthToken.startsWith('Bearer ')) ) {
            return res.send(response.fail('Unauthorized access'));
          }

        const token = AuthToken.slice(7);

        const AuthUser =  await this.getUser(token);

        if ( ! AuthUser ){
            return res.send(response.fail('Unauthorized access'));
        }
          
        req.user = AuthUser;

        next();
    },

    async getUser(token){
        const auth = await query.findBy('Auth', {token});

        if ( ! auth ){
            return null;
        }

        return await query.find('User', auth.user_id);
    }
}