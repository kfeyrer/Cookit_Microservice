/*
    Api which calles the Microservice actions with the necessary parameters
    Following API Endpoints:
        /api/search?query={query}
        /api/recipes/list
        /api/recipes/detail
        /api/addRecipes/add
        /api/auth/login
        /api/auth/registration
        /api/auth/logout
 */
module.exports = function api( options ) {
    //defines the allowed Microservice operation
    var valid_ops = { search:'search', list: 'list', detail: 'detail', login: 'login', registration: 'registration',logout: 'logout', add: 'add'};

    //will be exposed via URL endpoint
    this.add( 'role:api,path:search', function( msg, respond ) {
        // calls the Microservice with the parameters
        this.act( 'role:search', {
            cmd:   'search',
            query: msg.query
        }, respond )
    });

    this.add( 'role:api,path:recipes', function( msg, respond ) {
        this.act( 'role:recipes', {
            cmd:   valid_ops[msg.operation],
            recipe: msg.recipe || null
        }, function(err, data) {
            if (msg.operation !== 'detail') {
                respond(err, data);
                return;
            }

            this.act( 'role:user', {
                cmd: 'getUser',
                usernameId: data.data.username
            }, function(err, username) {
                data.data.username = username.data;
                respond(err, data);
            })

        } )
    });
    this.add( 'role:api,path:auth', function( msg, respond ) {
        this.act( 'role:auth', {
            cmd:   valid_ops[msg.operation],
            header: msg.req$.headers,
            recipe: msg.req$.body
        }, respond )
    });
    this.add('role:api,path:addRecipes', function( msg, respond ) {
        this.act( 'role:addRecipes', {
            cmd: valid_ops[msg.operation],
            header: msg.req$.headers,
            recipe: msg.req$.body
        }, respond )
    });


    // API Endpoints start with /api/
    this.add( 'init:api', function( msg, respond ) {
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
                },
                addRecipes: {
                    POST: true,
                    suffix:'/:operation'
                }
            }
        }});
        respond()
    });

};
