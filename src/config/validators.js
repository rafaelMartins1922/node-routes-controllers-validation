const {body,param} = require("express-validator");

const validateUser = (method) => {
    switch(method){
        case 'create':
            return [
                body('name').notEmpty().withMessage('Name must not be empty'),
                body('name').isAlpha().withMessage('Name must contain alphabet characters only'),
                body('email').isEmail().withMessage('Invalid e-mail'),
                body('password').notEmpty().isLength({min:8}).withMessage('Password must not contain at least 8 characters')
            ];
        case 'update':
            return [
                param('id').isNumeric().withMessage('Id must be a number'),
                body('name').optional().isAlpha().withMessage('Name must contain alphabet characters only'),
                body('email').optional().isEmail().withMessage('Invalid e-mail'),
            ];
    }
};

const validateEvent = (method) => {
    switch(method){
        case 'create':
            return [
                body('title').exists().withMessage('The event title must not be empty'),
                body('description').exists().withMessage('The event description must not be empty'),
                body('ticket_price').exists().isNumeric().withMessage('The ticket price must not be empty and must be a number'),
                body('starts_at').exists().isDate().withMessage('You must provide the date and time on which the event starts'),
                body('ends_at').exists().isDate().withMessage('You must provide the date and time on which the event ends'),
                body('contact_number').exists().isNumeric().withMessage('The contact number must exist and must be a number'),
                body('LocationId').exists().isNumeric().withMessage('The id for the location must exist and must be a number')
            ];
        case 'update':
            return [
                body('ticket_price').optional().isNumeric().withMessage('The ticket price must not be empty and must be a number'),
                body('starts_at').optional().isDate().withMessage('You must provide the date and time on which the event starts'),
                body('ends_at').optional().isDate().withMessage('You must provide the date and time on which the event ends'),
                body('contact_number').optional().isNumeric().withMessage('The contact number must exist and must be a number'),
                body('LocationId').optional().isNumeric().withMessage('The id for the location must exist and must be a number'),
                param('id').exists().isNumeric().withMessage('Id must be numeric')
            ];
    }
};

const validateLocation = (method) => {
    switch(method){
        case 'create':
            return [
                body('address').exists().withMessage('Location address must not be empty')
            ];
        case 'update':
            return [
                body('address').exists().withMessage('Location address must not be empty')
            ]
    }
};

const validateCellphone = (method) => {
    switch(method){
        case 'create':
            return [
                body('manufacturer').exists().withMessage('Manufacturer must not be empty'),
                body('number').exists().withMessage('Number must not be empty')
            ];
        case 'update':
            return [
               
            ];
    }
};

module.exports = {
    validateUser,
    validateEvent,
    validateLocation,
    validateCellphone
}