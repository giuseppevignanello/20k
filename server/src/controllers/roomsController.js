import { v4 as uuidv4 } from 'uuid';
const rooms = {};

// Create a room
export const createRoom = (req, res) => {
    const { maxPoints, maxPlayers } = req.body;

    if (!maxPoints || !maxPlayers) {
        return res.status(400).json({ error: 'Max points and max players are required.' });
    }

    const uuid = uuidv4();

    rooms[uuid] = {
        maxPlayers,
        players: [],
    };

    res.status(201).json({ message: 'Room created successfully.', uuid });
};

// Join a room
export const joinRoom = (req, res) => {
    const { roomName, playerName } = req.body;

    if (!roomName || !playerName) {
        return res.status(400).json({ error: 'Room name and player name are required.' });
    }

    const room = rooms[roomName];

    if (!room) {
        return res.status(404).json({ error: 'Room not found.' });
    }

    if (room.players.length >= room.maxPlayers) {
        return res.status(400).json({ error: 'Room is full.' });
    }

    if (room.players.includes(playerName)) {
        return res.status(400).json({ error: 'Player already in the room.' });
    }

    room.players.push(playerName);

    res.status(200).json({ message: 'Joined room successfully.', roomName, players: room.players });
};