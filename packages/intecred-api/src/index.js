const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './db.json'));
const middlewares = jsonServer.defaults();

app.db = router.db;

app.use(middlewares);
app.use(auth);
app.use(router);
app.listen(5000, () => console.log('Ready api => http://localhost:5000'));
