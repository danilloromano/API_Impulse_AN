
var mysql  = require('mysql');

function createDBConnection(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'dfromano1',
            database: 'impulse_php'
        });
}

module.exports = function() {
    return createDBConnection;
}
