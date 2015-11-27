require( 'seneca' )()

    .use( 'addRecipes' )
    // listen for role:math messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:addRecipes', port:'4003'} );