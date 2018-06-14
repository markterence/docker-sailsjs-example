var _ = require('lodash');
module.exports = {}
_.each([
    'Get',
    'Post',
    'Put',
    'Delete'
], function(verb){
    module.exports[`is${verb}`] = function(req, res){
        if(req.method != verb.toUpperCase())
            return res.status(404).json({
                "message" : `'${req.url}' not found.`
            });
    }
});