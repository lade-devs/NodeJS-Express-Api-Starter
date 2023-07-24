const {response} = require('../../../Helpers/response')

const {query} = require('../../../Database/Query');

exports.postContoller = {
    
    async index(request){
        
        let json = request.res;

        let paramsQuery = request.query;

        let perPage = paramsQuery.perPage ?? null;
        
        let pageNum = paramsQuery.pageNum ?? null;

        let data = await query.paginate('Post', perPage, pageNum);

        if ( ! data ){
            json.send(response.fail());
            return;
        }

        json.send(response.success('All posts fetched successfully', data));
    },

    async store(request)
    {
        let input = request.body;

        let json = request.res;

        const insert = await query.insert('Post', {
            title: input.title,
            author: input.author,
            content: input.content,
        });

        if ( ! insert ){
            json.send(response.fail());
            return;
        }

        json.send(response.success('Post added successfully', insert));
    },

    async show(request)
    {
        let id = request.params.id;

        let json = request.res;

        const data = await query.find('Post', id);

        if ( ! data ){
            json.send(response.notFound());
            return;
        }

        json.send(response.success('single post fetched successfully', data));
    },
    
    async update(request)
    {
        let id = request.params.id;

        let json = request.res;

        let input = request.body;

        const update = await query.update('Post', id, {
            title: input.title,
            author: input.author,
            content: input.content,
        });

        if ( ! update ){
            json.send(response.fail());
            return;
        }

        json.send(response.success('Post updated successfully', update));
    },
    
    async delete(request)
    {
        let id = request.params.id;

        let json = request.res;

        const data = await query.delete('Post', id);

        if ( ! data ){
            json.send(response.fail());
            return;
        }

        json.send(response.success('Post deleted successfully', data));
    },
}