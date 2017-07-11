
var app = require('./api/config/express-config.js')();
var http = require('http').Server(app);
var porta = process.env.PORT || 3000;

http.createServer(app).listen(porta, function(){
  console.log('Servidor rodando');
});

app.get('/',function(req,res){
  console.log('Recebida requisicao');
  res.send('index.html');
});
