const customerrController = require('../controllers/customercontroller');
const Joi = require('joi');


const customerRoutes = [
    {
        method :"POST",
        path :"/customer/register",
        options : {
             
            validate: {
                payload: Joi.object({
                    customername: Joi.string().min(3).max(30).required(),
                    customeremail: Joi.string().email().required() ,
                    password : Joi.string().required(),
                    customerContact : Joi.number().required(),
                    
                }),
           },
           description: 'customer registered',
           tags: ['api'],
        },
        handler:  customerrController.registration
    },
 {
        method: 'POST',
        path: '/customer/login',
        options: {

            validate: {
                payload: Joi.object({
                    customeremail: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            auth :'customerToken',
            description: 'customer login',
            tags: ['api'],
        },
        handler: customerrController.login
 },
{
    method: 'POST',
    path: '/customer/changepassword',
    options: {
        validate: {
            payload: Joi.object({
                oldPassword: Joi.string().required(),
                newPassword: Joi.string().required()
            })
        },
        auth :'customerToken',
        description: 'customer change the password',
        tags: ['api'],
    },
    handler: customerrController.changePassword
    },
{
    method :"PUT",
    path :"/customer/editprofile",
    options: {
        validate: {
                payload: Joi.object({
                customername: Joi.string().max(255),
                customeremail: Joi.string().email(),
                password : Joi.string(),
                customerContact : Joi.number().max(10),
                
            })
        },
        auth :'customerToken',
        description: 'customer edit the profile',
        tags: ['api'],
    },
    handler: customerrController.editProfile
}, 
]
module.exports = customerRoutes