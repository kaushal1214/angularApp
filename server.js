const http = require('http');
const debug = require('debug')("my-angular");
const app = require('./backend/app');


const normalizePort = val =>{
  var port = parseInt(val,10);

  if(isNaN(port))
  {
    return val;
  }

  if(port>3000)
  {
    return port;
  }

  return false;

}

const onError = error=>{
  if(error.syscall!=="listen")
  {
    throw error;
  }
  const bind = typeof addr=== "string" ? "pipe" + addr: "port" + port;
  switch(error.code)
  {
    case "EACCESS":
      console.log(bind+ "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(bind+ "is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const onListening =()=>{
  console.log("Listening...")
  const addr = server.address();
  const bind = typeof addr ==="string"?"pipe"+addr:"port"+port;
  debug("Listening on " + bind);
}

const port = normalizePort(process.env.PORT||"3300");
app.set('port',port);

const server = http.createServer(app);
server.on("error",onError);
server.on("listening",onListening);

server.listen(port);
