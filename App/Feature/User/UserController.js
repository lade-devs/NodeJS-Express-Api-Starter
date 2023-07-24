const {response} = require('../../../Helpers/response')

const {query} = require('../../../Database/Query');

const {crypt} = require('../../../Helpers/crypt');

exports.userContoller = {
    
    async index(request){
        let data = await query.all('User', ['-password']);

        let json = request.res;

        if ( ! data ){
            json.send(response.fail());
            return;
        }

        request.res.send(response.success('All users fetched successfully', data));
    },
    
    async store(request)
    {
        let input = request.body;

        let json = request.res;

        const password = await crypt.hash(input.password);

        const insert = await query.insert('User', {
            name: input.name,
            email: input.email,
            password,
            role: input.role,
            //created_at: new Date().toISOString(),
        });

        if ( ! insert ){
            json.send(response.fail());
            return;
        }

        json.send(response.success('User added successfully', insert));
    },

    async show(request)
    {
        let id = request.params.id;

        let json = request.res;

        const data = await query.find('User', id, ['-password']);

        if ( ! data ){
            json.send(response.notFound());
            return;
        }

        json.send(response.success('single user fetched successfully', data));
    },
    
    async update(request)
    {
        let id = request.params.id;

        let json = request.res;

        let input = request.body;

        const update = await query.update('User', id, {
            name: input.name,
            email: input.email,
            role: input.role,
        });

        if ( ! update ){
            json.send(response.fail());
            return;
        }

        json.send(response.success('User updated successfully', update));
    },
    
    
    async delete(request)
    {
        let id = request.params.id;

        let json = request.res;

        const data = await query.delete('User', id);

        if ( ! data ){
            json.send(response.fail());
            return;
        }

        json.send(response.success('User deleted successfully', data));
    },
}