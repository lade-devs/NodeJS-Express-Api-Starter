const {response} = require('./../../../Helpers/response');

const {query} = require('../../../Database/Query');

exports.postRequest = async (req, res, next) => {
   
    let errors = [];
   
    let title = req.body.title;

    let content =  req.body.content;
    
    title ? null : errors.push({title: 'title is required'}); 

    title ? await query.findBy('Post', {title}) ? errors.push({title: 'title already exists'}) : null : null;
    
    content ? null : errors.push({content: 'content is required'}); 
    
    req.body.author ? null : errors.push({author: 'author is required'}); 

    content ? parseInt((content.toString()).length ) < 100 ? null : errors.push({content: 'content length is much'}) : null; 
    
    if ( errors.length > 0 ){
        return res.send(response.fail('validation error', errors));
    }

    next();
}
