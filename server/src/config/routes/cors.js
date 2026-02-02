function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //TODO: change with .env
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  next();

}

module.exports = { cors };