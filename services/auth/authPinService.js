require( 'seneca' )()

    .use( 'login' )
    // listen for role:math messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:auth', port:'4002'} );