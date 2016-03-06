var seneca = require('seneca')(),
    dbConfig = require('./conf/db_recipe'),
    _ = require('lodash');

//necessary to have auto incremented ids in the database
var incrementConfig = _.assign( {
	auto_increment: true
}, dbConfig);
seneca.use('mysql-store', dbConfig)
.use('mysql-store', incrementConfig);

module.exports = function addRecipes( options ) {

    this.add( 'role:addRecipes,cmd:add', add);

    function add(msg, respond) {
        console.log(msg.header.token);
        if (_.has(msg, ['header', 'token'], false) && _.has(msg, 'recipe')) {
            var recipes = seneca.make$('recipes');
	        recipes.name = checkWhitelist(respond, msg.recipe.name);
            recipes.ingredients = checkWhitelist(respond, msg.recipe.ingredients);
            recipes.description = checkWhitelist(respond, msg.recipe.description);
            //save entry in db
            recipes.save$(function (err, entity) {
                if (err) {
                    console.error('ADD: ' + err);
                    respond(null, {error: err, http$: {status: 403}});
                }
                else {
                    respond(null, {
                        data: entity,
                        http$: {status: 200}
                    });
                }
            });
        } else {
            respond(null, {
                data: {success: false},
                http$: {
                    status: 403
                }
            });
        }
    }

    function checkWhitelist(respond, string) {
        var whitelist = /[^A-Za-z0-9\.\,\s]/;

        if (!whitelist.test(string)) {
            return string;
        }

        console.error('ADD: bad data used: ' + string);
        respond(null, {error: 'ADD: bad data used', http$: {status: 400}})
    }
};
