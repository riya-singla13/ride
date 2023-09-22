const RideController = require('../controllers/rideController');
const Joi = require('joi');

const Routes =  [
   
  {
    method: 'POST',
    path: '/bookRide',
    options: {
            validate: {
                payload: Joi.object({
                    pickUp  : Joi.string().required(),
                    destination  : Joi.string().required(),
                    bookingDate : Joi.date()
                })
            },
            auth :'customerToken',
            description: 'customer book the ride',
            tags: ['api'],
        },
        handler: RideController.bookRide
        },
  {
    method: 'GET',
    path: '/myRides',
    options: {
          validate:{
           query:  Joi.object({
                driverName: Joi.string(),
                driverContact: Joi.number() ,
                pickUp : Joi.string(),
                destination : Joi.string(),
                bookingDate  :Joi.date(),
                rideStatus : Joi.string(),
                fare : Joi.number(),
                distance : Joi.number()
            })
        },
            auth :'customerToken',
            description: 'customer check the rides record',
            tags: ['api'],
     },
    handler: RideController.myRides,
  },
  {
    method: 'DELETE',
    path: '/cancelRides/{rideId}',
    options: { 
      validate: {
        params : Joi.object({
          rideId  : Joi.string().required()

        })
      },
        auth : 'customerToken',
        description: 'customer cancel the ride',
        tags: ['api'],
    },
    
    handler: RideController.cancelRide,
  },
  {
    method: 'POST',
    path: '/acceptRides/{rideId}',
    options: { 
      validate: {
        params : Joi.object({
          rideId  : Joi.string().required()

        })
      },
        auth : 'driverToken',
        description: 'driver accept the ride ',
        tags: ['api'],
    },
    
    handler: RideController.acceptRide,
  },
  {
    method: 'PUT',
    path: '/updateRides/{rideId}',
    options: { 
        validate : {
          payload : Joi.object({
            newStatus : Joi.string().required()
          })
        },
        auth : 'driverToken',
        description: 'rides updated',
        tags: ['api'],
    },
    
    handler: RideController.updateRideStatus,
  },
  {
    method: 'GET',
    path: '/driverRides',
    options: { 
      validate : {
        query : Joi.object({
          userName: Joi.string(),
          userPhoneNo: Joi.number() ,
          pickUp : Joi.string(),
          destination : Joi.string(),
          bookingDate  :Joi.date(),
          rideStatus : Joi.string(),
          fare : Joi.number(),
          distance : Joi.number()

        })
      },
        auth : 'driverToken',
        description: 'driver ridess',
        tags: ['api'],
    },
    
    handler: RideController.driverRides
  }
  
];
 
module.exports  = Routes
