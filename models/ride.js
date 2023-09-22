const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    customerId  :{
        type : mongoose.Schema.Types.ObjectId
    },
    driverId : {
        type: mongoose.Schema.Types.ObjectId
    },
   drivername : {
        type : String , 
        
           },
    driverContact : 
    {
        type : Number , 
        
    } ,
    customername : {
        type : String , 
        
           },
    customerContact : 
    {
        type : Number 
    },
        
    pickUp : { 
        type : String

    },
    destination : { 
        type : String

    },
    fare: {
        type : Number
        
         } , 
    bookingDate : { 
        type : Date

    },
    rideStatus : {
        type : String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending', 
        
    },
    distance : {
        type: Number
    }
});

module.exports = mongoose.model('ride', rideSchema);
