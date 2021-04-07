const router = require('express').Router();
const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');

router.post('/users', UserController.create);
router.get('/users',UserController.index);
router.get('/users/:id',UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

router.post('/events', EventController.create);
router.get('/events',EventController.index);
router.get('/events/:id',EventController.show);
router.put('/events/:id', EventController.update);
router.delete('/events/:id', EventController.delete);

module.exports = router;
