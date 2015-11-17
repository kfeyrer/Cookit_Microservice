require( 'seneca' )()

    .use( 'recipes' )
    // listen for role:math messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:recipes', port:'4001'} );