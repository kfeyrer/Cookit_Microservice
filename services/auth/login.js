var seneca = require('seneca')(),
    dbConfig = require('../../conf/db_user'),
    _ = require('lodash');

seneca.use('mysql-store', dbConfig);
module.exports = function search( options ) {

    this.add( 'role:auth,cmd:login', login);

    function login(msg, respond) {
        if (_.has(msg.body, 'username') && _.has(msg.body, 'password')) {
            var user = seneca.make$('user');
            user.list$({}, function (err, entities) {
                if (err) {
                    console.error('LOGIN: ' + err);
                    respond(null, {error: err, http$: {status: 404}});
                }
                else {
                    console.log(entities);
                    respond(null, getUser(entities, msg.body));
                }
            });
        } else {
            console.error('LOGIN: No User found');
            respond(null, {error: 'No User found', http$: {status:404}});
        }
    }

    function getUser(entities, userData) {
        var user = _.filter(entities, function(entity) {
            entity = entity.data$();
            return entity.email === userData.username && entity.password === userData.password;
        });

        if (user.length > 0) {
            return {
                data: {success: true},
                http$: {
                    status: 200,
                    headers: {
                        'Set-Cookie': 'token=1234;path=/;expires=' + expirationDate(false)
                    }
                }
            }
        }

        return {
            data: {success: false},
            http$: {
                status: 404,
                headers: {
                    'Set-Cookie': 'token=1234;path=/;expires=' + expirationDate(true)
                }
            }
        };
    }

    function expirationDate(expired) {
        var now = new Date(),
            time = now.getTime(),
            expirationTime = 1000*36000;
        if (expired) {
            now.setTime( time - expirationTime);
        } else {
            now.setTime( time + expirationTime);
        }

        return now.toGMTString();
    }
};
