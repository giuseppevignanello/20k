const express = require('express');
const router = express.Router();
const { createRoom, joinRoom } = require('../controllers/roomsController');


// Route to create a room
router.post('/rooms/create', createRoom);

// Route to join a room
router.post('/rooms/join', joinRoom);

module.exports = router;