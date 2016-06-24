/*
    Setup of Express webserver with Seneca integration
 */
var express    = require("express"),
    seneca = require('seneca')(),
    app = express();

seneca.use( 'api' ) //loads the api file
    .client( { type:'tcp', pin:'role:search', host: '10.0.0.30', port: '4000' } ) //send any role:search action to the Microservice
    .client( { type:'tcp', pin: 'role:recipes', host: '10.0.0.29', port: '4001' }) //send any role:recipes action to the Microservice
    .client( { type:'tcp', pin: 'role:auth', port: '4002' }) //send any role:auth action to the Microservice
    .client( { type:'tcp', pin: 'role:addRecipes', host: '10.0.0.28', port: '4003' }); //send any role:addRecipes action to the Microservice
.client( { type:'tcp', pin: 'role:user', port: '4004' }); //send any role:addRecipes action to the Microservice

app.use( require('body-parser').json())
    .use( seneca.export( 'web' ) ) //integration between seneca and express
    .listen(3000); //express webservice listens on port 3000
