const {crypt} = require('./../../../Helpers/crypt');

const {query} = require('../../../Database/Query');

const jwt = require('jsonwebtoken');

exports.login = {

    password: '',
    
    hashedPassword: '',

    user_id: '',

    async execute(email, password)
    {
        const user = await query.findBy('User', {email});

        if ( ! user ){
            return null;
        }

        this.password = password;

        this.hashedPassword = user.password;

        this.user_id = user._id;

        if ( ! await this.validatePasssword()  ){
            return null;
        }

        const token = await this.generateToken();

        if ( ! token ){
            return null;
        }

        user.token = token;

        delete user.password;

        return user;
    },

    async validatePasssword()
    {
        const validatePasssword = await crypt.verify(this.password, this.hashedPassword);
        
        return validatePasssword;
    },

    async generateToken()
    {
        const token = jwt.sign({data: this.user_id}, 'secret', { expiresIn: '1h' });

        await this.deleteTokenIfExists();

        const saveToken = await query.insert('Auth', {
            token, // for security measure :: encrypt
            user_id: this.user_id,
        });

        return saveToken ? token : null;
    },

    async deleteTokenIfExists(){
        const token = await query.findBy('Auth', {user_id: this.user_id,});
        
        token ? await query.delete('Auth', token._id) : null;
    },
}