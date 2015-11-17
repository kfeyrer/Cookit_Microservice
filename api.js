module.exports = function api( options ) {
    var valid_ops = { search:'search'};

    this.add( 'role:api,path:search', function( msg, respond ) {
        this.act( 'role:search', {
            cmd:   valid_ops[msg.operation],
            query: msg.query
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
                    GET:true,
                    suffix:'/:operation'
                }
            }
        }});

        respond()
    })

};
