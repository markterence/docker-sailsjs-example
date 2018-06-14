var empty = require('is-empty');

module.exports = {
	
	destroy: function(req, res){
		let where = {
			id: req.params.id
		};
		let values = {
			is_deleted:true
		};
		
		Todo.update(where, values)
		.then(function(result){
			return res.ok('Successfully deleted.');
		})
		.catch(function (err){
			return res.serverError("An error has occurred while deleting the record.");
		}); 
	},
	

	
};