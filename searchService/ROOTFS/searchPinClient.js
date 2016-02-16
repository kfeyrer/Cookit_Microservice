require( 'seneca' )()

    // a local pattern
    .add( 'say:hello', function( msg, respond ){ respond( null, {text:"Hi!"} ) } )

    // send any role:math patterns out over the network
    // IMPORTANT: must match listening service
    .client( { type:'tcp', pin:'role:search', port: '4000' } )

    // executed remotely
    .act( 'role:search,cmd:search,query:test', console.log )

    // executed locally
    .act('say:hello',console.log)