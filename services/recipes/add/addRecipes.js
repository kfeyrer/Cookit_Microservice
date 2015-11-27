var seneca = require('seneca')(),
    dbConfig = require('../../../conf/db_recipe'),
    _ = require('lodash'),
    convertRecipe = require('../../../utils/convertRecipe');

seneca.use('mysql-store', dbConfig);
module.exports = function addRecipes( options ) {

    this.add( 'role:addRecipes,cmd:add', add);

    function add(msg, respond) {
        console.log(msg.header.token);
        if (_.has(msg, ['header', 'token'], false) && _.has(msg, 'recipe')) {
            var recipes = seneca.make$('recipes');
            recipes.name = msg.recipe.name;
            recipes.ingredients = msg.recipe.ingredients;
            recipes.description = msg.recipe.description;
            //add entry
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
};
