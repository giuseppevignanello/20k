const routes = []; 

function post(path, handler) {
    routes.push({method: 'POST', path, handler});
}

function handle(req, res) {
    const route = routes.find(
        r => r.method === req.method && r.path === req.url
    ); 

    if(!route) {
        res.writeHead(404); 
        return res.end('Not Found'); 
    }

    route.handler(req, res);
}

exports.router = {post, handle};