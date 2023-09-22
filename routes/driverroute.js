const driverController = require('../controllers/drivercontroller');
const Joi = require('joi');


const driverRoutes = [
    {
        method :"POST",
        path :"/driver/register",
        config : { 
             
            validate: {
                payload: Joi.object({
                    driverName: Joi.string().min(3).max(30).required(),
                    driveremail: Joi.string().email().required() ,
                    password : Joi.string().required(),
                    driverContact : Joi.number().required(),
                    driverVehicletype : Joi.string().required()
                }),
           
            
            },
            description: 'driver registered',
            tags: ['api'],
        },
        handler:  driverController.registration
    },
 {
        method: 'POST',
        path: '/driver/login',
        options: {
            validate: {
                payload: Joi.object({
                    driveremail: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            auth :'driverToken',
            description: 'driver login',
            tags: ['api'],
        },
        handler: driverController.login
 },
{
    method: 'POST',
    path: '/driver/changepassword',
    options: {
        validate: {
            payload: Joi.object({
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().required()
            })
        },
        auth :'driverToken',
        description: 'driver change the password',
        tags: ['api'],
    },
    handler: driverController.changePassword
    },
{
    method :"PUT",
    path :"/driver/editprofile",
    options: {
        validate: {
                payload: Joi.object({
                driverName: Joi.string().max(255),
                driveremail: Joi.string().email(),
                password : Joi.string(),
                driverContact : Joi.number().max(10),
                driverVehicletype : Joi.string().required(),
            })
        },
        auth :'driverToken',
        description: 'driver edit the profile',
        tags: ['api'],
    },
    handler: driverController.editProfile
}, 
]
module.exports = driverRoutes