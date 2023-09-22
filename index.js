const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const mongoose = require('mongoose');
const Driver = require('./models/driver');
const DriverRoutes= require('./routes/driverroute');
const basicAuthPlugin = require('./plugins/authbasic');
const AuthBearerPlugin = require('./plugins/authBearer');
const DriverController = require('./controllers/drivercontroller');
const Customer = require('./models/customer');
const CustomerRoutes= require('./routes/customerroute');
const CustomerController = require('./controllers/customercontroller');
const Ride = require('./models/ride');
const RideRoutes = require('./routes/rideroute');
const RideController = require('./controllers/rideController');
mongoose.connect('mongodb://127.0.0.1:27017/Ride')

 .then(() => { 
  console.log("db started!");
 })
 .catch((e) => {
  console.log(e);
 });

 const init = async () => {


    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
          await server.register([
          Inert,
          Vision,
          {
            plugin: HapiSwagger,
            options: {
              info: {
                title: 'API Documentation',
                version: '1.0.0',
              },
            },
          },
        ]);
    await server.register(basicAuthPlugin);
    await server.register(AuthBearerPlugin);

    server.validator(require('joi'));
   server.route(DriverRoutes);
   server.route(CustomerRoutes);
   server.route(RideRoutes);

   await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();