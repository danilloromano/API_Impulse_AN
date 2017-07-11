
var mysql  = require('mysql');

function createDBConnection(){

  // if(!process.env.NODE_ENV) {
  //       return mysql.createConnection({
  //               host:'localhost',
  //               user:'root',
  //               password:'dfromano1',
  //               database:'impulse_php'
  //       });
  //   }

    // if (process.env.NODE_ENV == 'production') {
		// var url = process.env.CLEARDB_DATABASE_URL;
    // console.log(url);
		// var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
		return mysql.createConnection({
			host:'us-cdbr-iron-east-03.cleardb.net',
			user:'b47a2aab68dcf6',
			password:'64ce4623',
			database:'heroku_8a96551247824ef'
		});
  // }
}

module.exports = function() {
    return createDBConnection;
}
