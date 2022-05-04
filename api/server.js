const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const routes = {
  '/api/*': '/$1'
};
const middlewares = [jsonServer.defaults(), jsonServer.rewriter(routes)];

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/structures/count', (req, res) => {
  let structureCountTab = [];
  // Compétences de base
  structureCountTab.push({ id: '260', count: 12 });
  structureCountTab.push({ id: '259', count: 10 });
  structureCountTab.push({ id: '261', count: 10 });
  structureCountTab.push({ id: '249', count: 9 });
  structureCountTab.push({ id: '222', count: 9 });
  structureCountTab.push({ id: '212', count: 8 });
  structureCountTab.push({ id: '186', count: 7 });
  structureCountTab.push({ id: '183', count: 6 });
  // Accès aux droits
  structureCountTab.push({ id: '176', count: 6 });
  structureCountTab.push({ id: '175', count: 1 });
  structureCountTab.push({ id: '174', count: 2 });
  structureCountTab.push({ id: '173', count: 2 });
  structureCountTab.push({ id: '172', count: 2 });
  structureCountTab.push({ id: '171', count: 4 });
  structureCountTab.push({ id: '167', count: 3 });
  structureCountTab.push({ id: '165', count: 2 });
  // Insertion sociale et professionnelle
  structureCountTab.push({ id: '254', count: 5 });
  structureCountTab.push({ id: '240', count: 4 });
  structureCountTab.push({ id: '194', count: 7 });
  structureCountTab.push({ id: '193', count: 7 });
  structureCountTab.push({ id: '192', count: 5 });
  structureCountTab.push({ id: '191', count: 7 });
  structureCountTab.push({ id: '262', count: 5 });
  structureCountTab.push({ id: '263', count: 3 });
  structureCountTab.push({ id: '3', count: 3 });
  // Aide à la parentalité
  structureCountTab.push({ id: '257', count: 4 });
  structureCountTab.push({ id: '238', count: 1 });
  structureCountTab.push({ id: '178', count: 4 });
  structureCountTab.push({ id: '166', count: 2 });
  // Culture et sécurité numérique
  structureCountTab.push({ id: '264', count: 5 });
  structureCountTab.push({ id: '255', count: 7 });
  structureCountTab.push({ id: '265', count: 2 });
  structureCountTab.push({ id: '232', count: 4 });
  structureCountTab.push({ id: '225', count: 5 });
  structureCountTab.push({ id: '221', count: 3 });
  structureCountTab.push({ id: '218', count: 2 });
  structureCountTab.push({ id: '209', count: 3 });
  structureCountTab.push({ id: '208', count: 4 });
  structureCountTab.push({ id: '206', count: 5 });
  structureCountTab.push({ id: '195', count: 5 });
  structureCountTab.push({ id: '164', count: 4 });
  structureCountTab.push({ id: '163', count: 2 });
  structureCountTab.push({ id: '162', count: 3 });
  // Accompagnement des démarches
  structureCountTab.push({ id: 'Accompagnant CAF', count: 7 });
  structureCountTab.push({ id: 'Pôle Emploi', count: 9 });
  structureCountTab.push({ id: 'CPAM', count: 7 });
  structureCountTab.push({ id: 'Impôts', count: 6 });
  structureCountTab.push({ id: 'Logement', count: 5 });
  structureCountTab.push({ id: 'CARSAT', count: 5 });
  structureCountTab.push({ id: 'Autres', count: 2 });
  // Publics acceptés
  structureCountTab.push({ id: 'Tout public', count: 7 });
  structureCountTab.push({ id: 'Moins de 16 ans', count: 4 });
  structureCountTab.push({ id: 'Jeunes (16-25 ans)', count: 6 });
  structureCountTab.push({ id: 'Adultes', count: 9 });
  structureCountTab.push({ id: 'Séniors (+ de 65 ans)', count: 1 });
  // Labels et qualifications
  structureCountTab.push({ id: 'Aidants Connect', count: 0 });
  structureCountTab.push({ id: 'Espace public numérique (EPN)', count: 2 });
  structureCountTab.push({ id: 'Fabrique de territoire', count: 3 });
  structureCountTab.push({ id: 'Maison France Service', count: 0 });
  structureCountTab.push({ id: 'Pass numérique', count: 4 });
  // Modalités d'accès
  structureCountTab.push({ id: 'Uniquement sur RDV', count: 13 });
  structureCountTab.push({ id: 'Accès libre', count: 6 });
  structureCountTab.push({ id: 'Téléphone / Visio', count: 6 });
  // Accompagnement des publics
  structureCountTab.push({ id: "Personnes en situation d'illetrisme", count: 0 });
  structureCountTab.push({ id: 'Langue étrangère (anglais)', count: 0 });
  structureCountTab.push({ id: 'Langues étrangères (autres)', count: 0 });
  structureCountTab.push({ id: 'Surdité', count: 0 });
  structureCountTab.push({ id: 'Déficience visuelle', count: 0 });
  structureCountTab.push({ id: 'Handicap moteur', count: 0 });
  // Équipements et services proposés
  structureCountTab.push({ id: 'Wifi en accès libre', count: 6 });
  structureCountTab.push({ id: 'Ordinateurs', count: 5 });
  structureCountTab.push({ id: 'Tablettes', count: 1 });
  structureCountTab.push({ id: 'Bornes numériques', count: 1 });
  structureCountTab.push({ id: 'Imprimantes', count: 5 });
  structureCountTab.push({ id: 'Prêt / don de matériels', count: 0 });
  structureCountTab.push({ id: 'Reconditionnements de matériel', count: 0 });
  structureCountTab.push({ id: 'Accès à des revues ou livres informatiques et numériques', count: 0 });

  return res.status(200).jsonp(structureCountTab);
});

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
