var seneca = require('seneca')(),
    dbConfig = require('./conf/db_user'),
    _ = require('lodash');

seneca.use('mysql-store', dbConfig);
module.exports = function user( options ) {

    this.add( 'role:user,cmd:getUser', getUserFromDb);

    function getUserFromDb(msg, respond) {
        var userId = msg.usernameId;
        var user = seneca.make$('user');
        user.list$({id: userId}, function (err, entities) {
            if (err) {
                console.error('GETUSER: ' + err);
                respond(null, {error: err, http$: {status:404}});
            }
            else {
                respond(null, {
                    data: getUsername(_.first(entities)),
                    http$: {
                        status: 200
                    }});
            }
        });
    }

    function getUsername(entity) {
        return entity.data$().username
    }
};
