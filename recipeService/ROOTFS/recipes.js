var seneca = require('seneca')(),
    dbConfig = require('./conf/db_recipe'),
    _ = require('lodash'),
    convertRecipe = require('./utils/convertRecipe');

seneca.use('mysql-store', dbConfig);
module.exports = function recipes( options ) {

    this.add( 'role:recipes,cmd:list', list);
    this.add( 'role:recipes,cmd:detail', detail);

    function list(msg, respond) {
        var recipes = seneca.make$('recipes');
        recipes.list$({}, function (err, entities) {
            if (err) {
                console.error('LIST: ' + err);
                respond(null, {error: err, http$: {status:404}});
            }
            else {
                respond(null, {
                    data: convertRecipe(entities),
                    http$: {status: 200}});
            }
        });
    }

    function detail(msg, respond) {
        if (msg.recipe) {
            var recipes = seneca.make$('recipes');
            recipes.list$({id: msg.recipe}, function (err, entities) {
                if (err) {
                    console.error('DETAIL: ' + err);
                    respond(null, {error: err, http$: {status:404}});
                }
                else {
                    respond(null, {
                        data: _.first(convertRecipe(entities)),
                        http$: {
                            status: 200
                            //for setting the cookie on login
                            //headers: {
                            //    'Set-Cookie': 'bla=1234;path=/'
                            //}
                        }});
                }
            });
        } else {
            console.error('DETAIL: Wrong Parameter');
            respond(null, {error: 'Wrong parameter', http$: {status:404}});
        }

    }
};
