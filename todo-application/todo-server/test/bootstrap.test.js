
var SailsApp = require('sails').Sails;
var sails = new SailsApp();

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(60000);

  sails.lift({
    // configuration for testing purposes
 
    hooks: {
        grunt: false
    },
    hookTimeout: 60000,
    models: {
        connection: 'mysql_crm',
        migrate: 'safe',
        //autoCreatedAt: false,
        //autoUpdatedAt: false
        //autoPK: false,
    },
    connections: {
      mysqlDataStore: {
        adapter: 'sails-mysql',
        host: process.env.DB_HOST,
        user: process.env.DB_USER, //optional
        password: process.env.DB_PASSWORD, //optional
        database: 'todo-app-test' //optional
      }
    },
    bootstrap: function(cb){
      sails.on('lifted', function() {
        // Your post-lift startup code here
        sails.log.info('Test Env Bootstrap');
        sails.log.info(`Model Connection ${sails.config.models.migrate}`);
        
      });
      return cb();
    }
  }, function(err) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});

//mocha.opts