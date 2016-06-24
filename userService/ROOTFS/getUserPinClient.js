require( 'seneca' )()

    // a local pattern
    .add( 'say:hello', function( msg, respond ){ respond( null, {text:"Hi!"} ) } )

    // send any role:math patterns out over the network
    // IMPORTANT: must match listening service
    .client( { type:'tcp', pin:'role:user', port:'4004' } )

    // executed remotely
    .act( 'role:user,cmd:getUser,body: {"id": 1}', console.log )

    // executed locally
    .act('say:hello',console.log);