const JsonServer = require('json-server');
const server = JsonServer.create();
const router = JsonServer.router('./src/assets/db.json');
const middlewares = JsonServer.defaults({
  static: './build',
});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log('Server is running');
});
