var seneca = require('seneca')(),
    _ = require('lodash'),
    expirationDate = require('../utils/expirationDate');

seneca.use('user');
seneca.client({role:'user',cmd:'*'});
module.exports = function auth( options ) {

    this.add( 'role:auth,cmd:login', login);
    this.add( 'role:auth, cmd:registration', add);
    this.add( 'role:auth, cmd:logout', logout);


    function login(msg, respond) {
        if (_.has(msg.body, 'username') && _.has(msg.body, 'password')) {
            getUser(msg.body, respond);
        } else {
            console.error('LOGIN: No User found');
            respond(null, {error: 'No User found', http$: {status:404}});
        }
    }

    function logout(msg, respond) {
        console.log(msg.header.token);
        if (msg.header.token) {
            seneca.act('role:user', {
                cmd: 'logout',
                token: msg.header.token
            }, function(err, data) {
                console.log(data);
                if (!data.ok || err) {
                    respond(null, {
                        data: {success: false},
                        http$: {
                            status: 403,
                            headers: {
                                'Set-Cookie': 'token;path=/;expires=' + expirationDate(true)
                            }
                        }
                    });
                } else {
                    respond(null, {
                        data: {success: true},
                        http$: {
                            status: 200,
                            headers: {
                                'Set-Cookie': 'token;path=/;expires=' + expirationDate(true)
                            }
                        }
                    });
                }
            });
        } else {
            respond(null, {
                data: {success: false},
                http$: {
                    status: 403,
                    headers: {
                        'Set-Cookie': 'token;path=/;expires=' + expirationDate(true)
                    }
                }
            });
        }
    }

    function getUser(userData, respond) {
        var data = {};

        //send correct cookie token
        seneca.act( 'role:user', {
            cmd: 'login',
            email: userData.username,
            password: userData.password
        }, function(err, data) {
            console.log(data);
            if (!data.ok || err) {
                respond(null, {
                    data: {success: false},
                    http$: {
                        status: 404,
                        headers: {
                            'Set-Cookie': 'token;path=/;expires=' + expirationDate(true)
                        }
                    }
                });
            } else {
                var token = data.login.data$().id;
                respond(null, {
                    data: {success: true},
                    http$: {
                        status: 200,
                        headers: {
                            'Set-Cookie': 'token=' + token + ';path=/;expires=' + expirationDate(false)
                        }
                    }
                })
            }
        });
    }

    function add(msg, respond) {
        if (_.has(msg.body, 'username') && _.has(msg.body, 'password') && _.has(msg.body, 'passwordRepeat')) {
            seneca.act( 'role:user', {
                cmd:   'register',
                email: msg.body.username,
                password: msg.body.password,
                repeat: msg.body.passwordRepeat
            }, function(err, data) {
                console.log(data);
                if ((!data.ok) || err) {
                    respond(null, {error: data.why || data.exists || err});
                } else {
                    respond(null, {
                        data: {success: true},
                        http$: {
                            status: 200,
                            headers: {
                                //'Set-Cookie': 'token=1234;path=/;expires=' + expirationDate(false)
                            }
                        }
                    });
                }
            });
        } else {
            console.error('LOGIN: No User found');
            respond(null, {error: 'No User found', http$: {status:404}});
        }
    }
};
