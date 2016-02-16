var express    = require("express"),
    seneca = require('seneca')(),
    app = express();

seneca.use( 'api' )
    .client( { type:'tcp', pin:'role:search', port: '4000' } )
    .client( { type:'tcp', pin: 'role:recipes', port: '4001' })
    .client( { type:'tcp', pin: 'role:auth', port: '4002' })
    .client( { type:'tcp', pin: 'role:addRecipes', port: '4003' });

app.use( require('body-parser').json())
    .use( seneca.export( 'web' ) )
    .listen(3000);