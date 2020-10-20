const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/structures/count', (req, res) => {
  let structureCountTab = [];
  structureCountTab.push({ id: 260, count: 3 });
  structureCountTab.push({ id: 260, count: 3 });
  structureCountTab.push({ id: 259, count: 3 });
  structureCountTab.push({ id: 261, count: 3 });
  structureCountTab.push({ id: 249, count: 3 });
  structureCountTab.push({ id: 222, count: 2 });
  structureCountTab.push({ id: 212, count: 3 });
  structureCountTab.push({ id: 186, count: 2 });
  structureCountTab.push({ id: 183, count: 2 });
  return res.status(200).jsonp({
    structureCountTab,
  });
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
