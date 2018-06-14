var empty = require('is-empty');
var Promise = require('promise');

var shuffle = require('shuffle-array');

module.exports = {
	batchSeed: function(model, mockJsonFile, tag, force){
		return new Promise((resolve, reject)=>{
			model.create(mockJsonFile).exec(function(error, created){
				if(error){
					sails.log.error(error.code);
					reject(error);
				}
				console.log(`${tag} created.`);
				resolve()
			})
		});
	},
	seedArrayV2: function(model, tag){
		return new Promise((resolve, reject)=>{
			let promises = [];
			model.find().exec((err, res)=>{
				if(err)
				{
					console.log(err);
					reject(err);
				}
				if(!empty(res)){
					resolve({status:true, result: res});
					console.log(`${tag} won't plant seed anymore.`)
				}
				else
				{
					model.seed.forEach((element, index)=>{
						promises.push(
							model.create(model.seed[index]).then(function(fulfilled){
								if(index >= model.seed.length-1){
									console.log(`${tag} seed planted.`);
									//resolve({status:true, result: res});
								}
							})
						); //end push
					})
					Promise.all(promises).then(ok=>{
						resolve({status:true, result: res});
					}).catch((err)=>{
						
					})
				}
			}); 
		})
	},
	seedArray: function(model, tag){
		return new Promise((resolve, reject)=>{
			model.find().exec((err, res)=>{
				if(err)
				{
					console.log(err);
					reject(err);
				}
				if(!empty(res)){
					resolve({status:true, result: res});
					console.log(`${tag} won't plant seed anymore.`)
				}
				else{
 
					model.seed.forEach((element, index) => {
						model.create(model.seed[index]).exec((err, result)=>{
							if(err)
							{
								console.log(err);
								reject(err);
							}	
							if(index >= model.seed.length-1){
								console.log(`${tag} seed planted.`)
								resolve({status:true, result: res});
							}
						});
					});
				}
			});	
		})
	}
}