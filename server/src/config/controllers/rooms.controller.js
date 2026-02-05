const { parseBody } = require('../utils/bodyParser'); 
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const rooms = new Map(); 

/**
 * This function just create a new room 
 * with a random UUID into the server
 * @param {import('http').IncomingMessage} req 
 * @param {import('http').ServerResponse} res 
 */
function createRoom(req, res) {
    const roomId = crypto.randomUUID();

    rooms.set(roomId, {
        players: []
    });

    res.writeHead(201, {'Content-Type': 'application/json'}); 
    res.end(JSON.stringify({ roomId }));
}


/**
 * 
 * This function only redirect to the front end. 
 * It is the FE that handle the join with WS
 * @param {import('http').IncomingMessage} req 
 * @param {import('http').ServerResponse} res 
 */
function showRoom(req, res) {
  const filePath = path.join(__dirname, '../front/index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
}



/**
 * Maybe we depracate this
 * Join the room
 * @param {import('http').IncomingMessage} req 
 * @param {import('http').ServerResponse} res
 * @returns 
 */
async function joinRoom(req, res) {
    try {
        const body = await(parseBody(req)); 
        const room = rooms.get(body.roomId); 

        if(!room) {
            res.writeHead(404); 
            return res.end('Room not found'); 
        }

        // TODO: change this to create an actual player
        room.players.push(body.playerId);
        res.end('Hoined room')
    } catch (err) {
        res.writeHead(400);
        res.end('Invalid Json') 
        
    }
}

module.exports = { 
    createRoom,
    showRoom, 
    joinRoom, 
    rooms 
}; 