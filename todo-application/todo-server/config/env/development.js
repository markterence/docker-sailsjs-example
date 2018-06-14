/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  port: process.env.PORT,
  models: {
    connection: 'mysql_crm', //by default models without connection defined will use mysql_crm
    migrate: 'safe'
  },
  hookTimeout: process.env.HOOK_TIMEOUT,
  connections:{
    mysqlDataStore: {
      adapter: 'sails-mysql',
      host: process.env.DB_HOST,
      user: process.env.DB_USER, //optional
      password: process.env.DB_PASSWORD, //optional
      database: process.env.DB_DATABASE //optional
    }
  },
  bootstrap: function(cb){
    sails.on('lifted', function() {
      // Your post-lift startup code here
      sails.log.info('Dev Bootstrap');
      sails.log.info(`Model Connection ${sails.config.models.migrate}`);
          
    });
    sails.after('hook:orm:loaded', function(){
      process.send('ready')
    })
    return cb();
  }
};
