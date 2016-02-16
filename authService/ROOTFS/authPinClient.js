require( 'seneca' )()

    // a local pattern
    .add( 'say:hello', function( msg, respond ){ respond( null, {text:"Hi!"} ) } )

    // send any role:math patterns out over the network
    // IMPORTANT: must match listening service
    .client( { type:'tcp', pin:'role:auth', port:'4002' } )

    // executed remotely
    .act( 'role:auth,cmd:add, body:{username:"test@test.at", password: "1234", passwordRepeat: "1234"}', console.log )
    .act( 'role:auth,cmd:login, body:{username:"test@test.at", password: "1234"}', console.log )


    // executed locally
    .act('say:hello',console.log);