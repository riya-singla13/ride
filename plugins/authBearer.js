const AuthBearer = require('hapi-auth-bearer-token');
const Driver = require ( '../models/driver');
const Customer = require ( '../models/customer');


const validatedriver= async (request, token, h) => {
    try {
        const driver = await Driver.findOne({token});
        if (driver){
        const credentials = { _id : driver._id,driverName: driver.driverName};
        
        return { isValid: true, credentials};
    }else {
        return { isValid: false, credentials: null };
    }
} catch (error) {
    return {isValid: false, credentials: null}
}
};
const validatecustomer= async (request, token, h) => {
    try{
        const customer = await Customer.findOne({token});
        if(customer){
        const credentials = { _id : customer._id,customername: customer.customername};
        
        return { isValid: true, credentials};
    } else {
        return { isValid: false, credentials: null };
    }
} catch (error) {
    return {isValid: false, credentials: null}
}
}




const Auth = [
{name: 'auth-bearer-token',
    register: async (server, options) => {
        await server.register(AuthBearer);
        server.auth.strategy('driverToken', 'bearer-access-token',{validate : validatedriver });
        server.auth.strategy('customerToken', 'bearer-access-token',{validate : validatecustomer });
    } 
}
]



module.exports = Auth