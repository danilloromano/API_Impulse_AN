
var mysql  = require('mysql');

function createDBConnection(){
        return mysql.createConnection({
            host: 'us-cdbr-iron-east-03.cleardb.net',
            user: 'b47a2aab68dcf6',
            password: '64ce4623',
            database: 'heroku_8a96551247824ef'
        });
}

module.exports = function() {
    return createDBConnection;
}
