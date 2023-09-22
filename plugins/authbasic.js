const Basic = require('@hapi/basic');
const Driver = require ( '../models/driver');



const validate = async (request, email, password) => {

    const driver = await Driver.findOne({email});
    if (!driver) {
        return { credentials: null, isValid: false };
    }

    const isValid = (password === driver.password);
    const credentials = { id: driver.id, name: driver.name };

    return { isValid, credentials };
};
 
 
const Auth = [
    {name: 'basic-auth',
    register: async (server, options) => {
        await server.register(Basic);

        server.auth.strategy('simple', 'basic', { validate });
    
    } 
},


];

module.exports = Auth