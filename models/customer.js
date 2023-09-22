const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customername: {
        type : String, 
        required : true
           },
    customeremail: {
            type : String, 
            required : true
           },
    password: {
        type : String, 
        required : true
           } ,
    customerContact: {
            type : Number,
            required : true
           },
    isBlock: {
            type: Boolean,  
            default: false
        },
    token: {
        type : String, 
        
           } 
});

module.exports = mongoose.model('customer', customerSchema);

