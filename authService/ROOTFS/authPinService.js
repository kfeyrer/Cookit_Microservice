require( 'seneca' )()

    .use( 'login' )
    // listen for role:auth messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:auth', port:'4002'} );