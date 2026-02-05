const { router } = require('./router');
const { createRoom, showRoom } = require('../controllers/rooms.controller');

router.post('/rooms', createRoom); 
router.get('/rooms/:id', showRoom);