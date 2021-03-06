require( 'seneca' )()

    // a local pattern
    .add( 'say:hello', function( msg, respond ){ respond( null, {text:"Hi!"} ) } )

    // send any role:math patterns out over the network
    // IMPORTANT: must match listening service
    .client( { type:'tcp', pin:'role:addRecipes', port:'4003' } )

    // executed remotely
    .act( 'role:addRecipes,cmd:add, recipe:{name: "test", ingredients: "1 Ei", description: "bla"m username: 1}, header:{token:"1234"}', console.log )

    // executed locally
    .act('say:hello',console.log)
