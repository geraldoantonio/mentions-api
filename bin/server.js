//dependências necessárias para subir nosso servidor HTTP e realizar o debug (procurar por erros).
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

//função para normalizar a porta em que vamos expor nossa aplicação.
// PORT // based on express-generator
function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) 
    return val;
  

  if (port >= 0) 
    return port;
  

  return false;
}

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

//função para tratar possíveis erros
// error handler
function onError(error) {
  if (error.syscall !== 'listen')
    throw error;
  

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//função para escutar o servidor e enfim colocamos ele no de pé.
// listener handler
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API is alive on http://localhost:${port}!`);