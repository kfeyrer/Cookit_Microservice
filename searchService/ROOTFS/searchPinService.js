require( 'seneca' )()

    //use file search
    .use( 'search' )
    // listen for role:search messages
    // IMPORTANT: must match client
    .listen( { type:'tcp', pin:'role:search', port:'4000' } );