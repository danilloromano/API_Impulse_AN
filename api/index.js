var http = require('http');
var app = require('./config/express-config.js')();

http.createServer(app).listen(3000, function(){
  console.log('Servidor rodando na porta 3000.');
});

app.get('/',function(req,res){
  console.log('Recebida requisicao na porta 3000.');
  res.send('index.html');
});
