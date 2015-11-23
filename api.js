module.exports = function api( options ) {
    var valid_ops = { search:'search', list: 'list', detail: 'detail', login: 'login', registration: 'registration',logout: 'logout'};

    this.add( 'role:api,path:search', function( msg, respond ) {
        this.act( 'role:search', {
            cmd:   'search',
            query: msg.query
        }, respond )
    });

    this.add( 'role:api,path:recipes', function( msg, respond ) {
        this.act( 'role:recipes', {
            cmd:   valid_ops[msg.operation],
            recipe: msg.recipe || null
        }, respond )
    });
    this.add( 'role:api,path:auth', function( msg, respond ) {
        this.act( 'role:auth', {
            cmd:   valid_ops[msg.operation],
            header: msg.req$.headers,
            body: msg.req$.body
        }, respond )
    });

    this.add( 'init:api', function( msg, respond ) {
        //this.act('role:web',{use:{
        //    prefix: '/api',
        //    pin:    'role:api,path:search',
        //    map: {
        //        search: { GET:true, suffix:'/:operation' }
        //    }
        //}})

        this.act('role:web',{use:{
            prefix: '/api',
            pin:    'role:api,path:*',
            map: {
                search: {
                    GET:true
                },
                recipes: {
                    GET:true,
                    suffix:'/:operation'
                },
                auth: {
                    POST:true,
                    suffix:'/:operation'
                }
            }
        }});

        respond()
    })

};
