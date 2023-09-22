const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    driverName: {
        type : String, 
        required : true
           },
    driveremail: {
            type : String, 
            required : true
           },
    password: {
        type : String, 
        required : true
           } ,
    driverContact: {
            type : Number,
            required : true
           },
    driverVehicletype: {
            type : String,
            required: true
           },
           isBlock: {
            type: Boolean,  
            default: false
        },
    token: {
        type : String, 
        
           } 
});

module.exports = mongoose.model('driver', driverSchema);

