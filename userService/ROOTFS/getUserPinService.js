require( 'seneca' )()

    .use( 'user' )
    // listen for role:recipes messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:user', port:'4004'} );