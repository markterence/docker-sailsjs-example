var fs = require('fs');
var async = require('async')
var knex = require('knex')
module.exports = function(sails){
    let dbViewsDir = 'api/db/views';
    var env = sails.config.environment;
    return {
        initialize: function(cb){
            //return cb();
            sails.on('hook:orm:loaded', function(){
              
                try {

                   //var connectionFolders = fs.readdirSync(dbViewsDir);
    
                    var connections = sails.config.connections;
                    //console.log(sails.config.connections)
                    Object.keys(connections).forEach(e=>{
                     
                        if(connections[e].adapter == 'sails-mysql'){
                            if(!fs.existsSync(dbViewsDir + '/' + e))
                            {
                                console.log(dbViewsDir + '/' + e + " Not Found");
                            }
                            else{
                                console.log(`Read Folder ${e}`);
                                var sqlfiles = fs.readdirSync(dbViewsDir + '/' + e);

                                let db = knex({client: 'mysql', connection: connections[e]});
                                async.each(sqlfiles, 
                                    function(sqlfile, callback){
                                        var sql = fs.readFileSync(dbViewsDir + '/' +e +'/' + sqlfile, 'utf-8');
                                        db.raw(sql).then(function(ok){

                                        }).catch(function(err){
                                            if(err.code == 'ER_TABLE_EXISTS_ERROR'){
                                                sails.log.info('Table exists ');
                                            }
                                            else{
                                                let msg = err.message.substring(0, 100)
                                                sails.log.error(`Error Knex`,err.code + '$$' + msg);
                                            }
                                                
                                        })
                                        callback();
                                    },
                                    function(err){
                                        db.destroy().then(function(){
                                            sails.log.info('Destroyed Knex Connection')
                                        }).catch(function(destoryErr){
                                            sails.log.error(destoryErr);
                                        });
                                    }
                                );
                                // sqlfiles.forEach(sqlfile => {
                                  
                                //         console.log('Read File '+ sqlfile)
                                        
                                //         var sql = fs.readFileSync(dbViewsDir + '/' +e +'/' + sqlfile, 'utf-8');
                                //         knex.raw(sql).then(function(ok){

                                //         }).catch(function(err){
                                //             if(err.code == 'ER_TABLE_EXISTS_ERROR'){
                                //                 sails.log.info('Table exists ');
                                //             }
                                //             else
                                //                 sails.log.error(`Error Knex`,err.code + ' ' + err.message);
                                //         })
                                    
                                // });
                            }
                        }
                    })
 
                } catch (error) {
                    if(error.code === 'ENOENT'){
                        sails.log.warn(`Not Found: ${dbViewsDir}`, error.message);
                    }
                    else
                    {
                        sails.log.warn(error.message);
                       // throw error;
                    }
                }
               //return cb();
            })
            cb();
        }
    }
}