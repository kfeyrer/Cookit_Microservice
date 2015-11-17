require( 'seneca' )()

    .use( 'search' )
    // listen for role:math messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:search' } )