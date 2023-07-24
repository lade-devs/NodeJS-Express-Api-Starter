const {login} = require('../../Actions/Auth/LoginAction');
const {response} = require('../../../Helpers/response');

exports.authController = {

    async login(request)
    {
        let input = request.body;

        let json = request.res;

        const authUser = await login.execute(input.email, input.password);

        ! authUser 
            ? json.send(response.fail('Wrong email or password')) 
            : json.send(response.success('Logged in successfully', authUser));
    },

    async logout(request)
    {
    },
}