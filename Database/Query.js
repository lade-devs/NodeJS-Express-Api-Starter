exports.query = {
    
    async all(model, except = []){
        const Model = require(`../App/Feature/${model}/${model}Model`);
        
        let processed = [];

        try{
            const data = await Model.find().select(except);
            processed = data;
        }catch(error){
            processed = false;
        }

        return processed;
    },

    async paginate(model, perPage = 10, pageNumber = 1, except = []){
        const Model = require(`../App/Feature/${model}/${model}Model`);
        
        let processed = [];

        perPage = perPage > 0 ? perPage : 1;

        pageNumber = pageNumber > 0 ? pageNumber : 1;

         const skip = (pageNumber - 1) * perPage;
        
        const totalProducts = await Model.countDocuments();
        
        const totalPages = Math.ceil(totalProducts / perPage);

        try{
            const data = await Model.find().skip(skip).limit(perPage).select(except);
            processed = {
                data,
                pageNumber,
                totalProducts,
                totalPages,
            };
        }catch(error){
            processed = false;
        }

        return processed;
    },
    
    async insert(model, content){
        const Model = require(`../App/Feature/${model}/${model}Model`);
        
        const data = new Model(content);

        let processed = false;

        try {
            const stored = await data.save();
            
            processed = stored;
        }catch (error) {
            processed = false;
        }

        return processed;
    },

    async find(model, id, except = []){
        const Model = require(`../App/Feature/${model}/${model}Model`);
        
        let processed = false;

        try{
            const data = await Model.findById(id).select(except).lean();
            processed = data;
        }catch(error){
            processed = false;
        }

        return processed;
    },

    async findBy(model, search, except = []){
        const Model = require(`../App/Feature/${model}/${model}Model`);
  
        let processed = false;

        try{
            const data = await Model.findOne(search).select(except).lean();
            processed = data;
        }catch(error){
            processed = false;
        }

        return processed;
    },

    async update(model, id, content){
        const Model = require(`../App/Feature/${model}/${model}Model`);
        
        const options = { new: true };
        
        let processed = false;

        try{
            const data = await Model.findByIdAndUpdate(id, content, options);
            processed = data;
        }catch(error){
            processed = false;
        }

        return processed;
    },

    async delete(model, id){
        const Model = require(`../App/Feature/${model}/${model}Model`);
        
        let processed = false;

        try{
            const data = await Model.findByIdAndDelete(id);
            processed = data;
        }catch(error){
            processed = false;
        }

        return processed;
    },
}