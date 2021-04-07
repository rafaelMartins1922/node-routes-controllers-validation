const router = require('express').Router();
const UserController = require('../controllers/UserController');
const EventController = require('../controllers/EventController');
const LocationController = require('../controllers/LocationController');
const CellphoneController = require('../controllers/CellphoneController');
const validators = require('../config/validators');

router.post('/users', validators.validateUser('create'),UserController.create);
router.get('/users',UserController.index);
router.get('/users/:id',UserController.show);
router.put('/users/:id', validators.validateUser('update'),UserController.update);
router.delete('/users/:id', UserController.delete);

router.post('/events', validators.validateEvent('create'),EventController.create);
router.get('/events',EventController.index);
router.get('/events/:id',EventController.show);
router.put('/events/:id', validators.validateEvent('update'), EventController.update);
router.delete('/events/:id', EventController.delete);

router.post('/locations', validators.validateLocation('create'),LocationController.create);
router.get('/locations',LocationController.index);
router.get('/locations/:id',LocationController.show);
router.put('/locations/:id', validators.validateLocation('update'),LocationController.update);
router.delete('/locations/:id', LocationController.delete);

router.post('/cellphones', validators.validateCellphone('create'),CellphoneController.create);
router.get('/cellphones',CellphoneController.index);
router.get('/cellphones/:id',CellphoneController.show);
router.put('/cellphones/:id', validators.validateCellphone('update'),CellphoneController.update);
router.delete('/cellphones/:id', CellphoneController.delete);

router.put('/subscribeToEvent/:userId/:eventId', UserController.subscribeToEvent);
router.put('/unsubscribeFromEvent/:userId/:eventId', UserController.unsubscribeFromEvent);
router.put('/acquireCellPhone/:userId/:cellphoneId', UserController.acquireCellPhone);
router.put('/throwAwayCellPhone/:userId/:cellphoneId', UserController.throwAwayCellPhone);
module.exports = router;
