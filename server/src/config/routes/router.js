const routes = []; 

function get(path, handler){
    routes.push({method: 'GET', path, handler})
}

function post(path, handler) {
    routes.push({method: 'POST', path, handler});
}

function matchRoute(routePath, url) {
  const routeParts = routePath.split('/');
  const urlParts = url.split('/');
  if (routeParts.length !== urlParts.length) return false;

  const params = {};
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(':')) {
      params[routeParts[i].slice(1)] = urlParts[i];
    } else if (routeParts[i] !== urlParts[i]) {
      return false;
    }
  }
  return params; // return object if matched, false otherwise
}

function handle(req, res) {
  console.log(req, res)
  for (const r of routes) {
    if (r.method !== req.method) continue;
    const params = matchRoute(r.path, req.url);
    if (params !== false) {
      req.params = params;
      return r.handler(req, res);
    }
  }
  res.writeHead(404);
  res.end('Not Found');
}


exports.router = {get, post, handle};