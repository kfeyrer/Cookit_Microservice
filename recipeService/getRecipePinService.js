require( 'seneca' )()

    .use( 'recipes' )
    // listen for role:recipes messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:recipes', port:'4001'} );