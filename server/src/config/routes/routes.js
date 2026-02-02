const { router } = require('./router'); 
const { createRoom, joinRoom } = require('../controllers/rooms.controller'); 

router.post('/rooms', createRoom); 
router.post('/rooms/join', joinRoom);