// curl http://localhost:3000/pagamentos/pagamento -X POST -v -H "Content-type: application/json" -d @files/pagamento.json | json_pp

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
