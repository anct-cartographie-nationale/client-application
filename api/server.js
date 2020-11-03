const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const routes = {
  '/api/*': '/$1',
};
const middlewares = [jsonServer.defaults(), jsonServer.rewriter(routes)];

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/structures/count', (req, res) => {
  let structureCountTab = [];
  // Compétences de base
  structureCountTab.push({ id: '260', count: 3 });
  structureCountTab.push({ id: '260', count: 3 });
  structureCountTab.push({ id: '259', count: 3 });
  structureCountTab.push({ id: '261', count: 3 });
  structureCountTab.push({ id: '249', count: 3 });
  structureCountTab.push({ id: '222', count: 2 });
  structureCountTab.push({ id: '212', count: 3 });
  structureCountTab.push({ id: '186', count: 2 });
  structureCountTab.push({ id: '183', count: 2 });
  // Accès aux droits
  structureCountTab.push({ id: '176', count: 2 });
  structureCountTab.push({ id: '175', count: 1 });
  structureCountTab.push({ id: '174', count: 1 });
  structureCountTab.push({ id: '173', count: 1 });
  structureCountTab.push({ id: '172', count: 1 });
  structureCountTab.push({ id: '171', count: 1 });
  structureCountTab.push({ id: '167', count: 1 });
  structureCountTab.push({ id: '165', count: 1 });
  // Insertion sociale et professionnelle
  structureCountTab.push({ id: '254', count: 2 });
  structureCountTab.push({ id: '240', count: 2 });
  structureCountTab.push({ id: '194', count: 3 });
  structureCountTab.push({ id: '193', count: 3 });
  structureCountTab.push({ id: '192', count: 3 });
  structureCountTab.push({ id: '191', count: 3 });
  structureCountTab.push({ id: '262', count: 3 });
  structureCountTab.push({ id: '263', count: 2 });
  structureCountTab.push({ id: '3', count: 2 });
  // Aide à la parentalité
  structureCountTab.push({ id: '257', count: 2 });
  structureCountTab.push({ id: '238', count: 2 });
  structureCountTab.push({ id: '178', count: 1 });
  structureCountTab.push({ id: '166', count: 1 });
  // Culture et sécurité numérique
  structureCountTab.push({ id: '264', count: 2 });
  structureCountTab.push({ id: '255', count: 2 });
  structureCountTab.push({ id: '265', count: 2 });
  structureCountTab.push({ id: '232', count: 2 });
  structureCountTab.push({ id: '225', count: 2 });
  structureCountTab.push({ id: '221', count: 2 });
  structureCountTab.push({ id: '218', count: 1 });
  structureCountTab.push({ id: '209', count: 1 });
  structureCountTab.push({ id: '208', count: 1 });
  structureCountTab.push({ id: '206', count: 2 });
  structureCountTab.push({ id: '195', count: 1 });
  structureCountTab.push({ id: '164', count: 1 });
  structureCountTab.push({ id: '163', count: 1 });
  structureCountTab.push({ id: '162', count: 2 });
  return res.status(200).jsonp(structureCountTab);
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
