const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.crypt = {
    async hash(value){
        const hashedValue = await bcrypt.hash(value, saltRounds);
        
        return hashedValue;
    },

    async verify(value, hashedValue){
        const valid = await bcrypt.compare(value, hashedValue);
        return valid;
    },
}