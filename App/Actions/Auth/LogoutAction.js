const {query} = require('../../../Database/Query');

exports.logout = {
    async execute(user)
    {
        const token = await query.findBy('Auth', {user_id: user._id});
        
        return token ? await query.delete('Auth', token._id) : true;
    },
}