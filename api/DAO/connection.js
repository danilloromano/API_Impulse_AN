
var mysql  = require('mysql');

function createDBConnection(){

  if(!process.env.NODE_ENV) {
        return mysql.createConnection({
                host:'localhost',
                user:'danillo',
                password:'dfromano1',
                database:'immpulse_php'
        });
    }
    if(process.env.NODE_ENV == 'production') {
      // var urlDeConexao = proces.env.CLEARDB_DATABASE_URL;
      // var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*):@(.*)\/(.*)\?reconnect=true/);
        return mysql.createConnection({
            host: 'us-cdbr-iron-east-03.cleardb.net',
            // host: grupos[3],
            user: 'b47a2aab68dcf6',
            password: '64ce4623',
            database: 'heroku_8a96551247824ef'
        });
    }
}

module.exports = function() {
    return createDBConnection;
}
