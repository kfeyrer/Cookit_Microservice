var seneca = require('seneca')(),
    dbConfig = require('./conf/db_recipe'),
    _ = require('lodash'),
    convertRecipe = require('./utils/convertRecipe');

// connects to db recipes
seneca.use('mysql-store', dbConfig);
module.exports = function search( options ) {

    //listenes to the pattern role:search
    //cmd defines which action should be used
    this.add( 'role:search,cmd:search', search);

    function search(msg, respond) {
        if (msg.query) {
            //uses table recipes
            var recipes = seneca.make$('recipes');
            //get all recipes from the db
            recipes.list$({}, function (err, entities) {
                if (err) {
                    console.error('SEARCH: ' + err);
                    respond(null, {error: err, http$: {status:404}});
                }
                else {
                    respond(null, {
                        data: convertRecipe(entities).filter(function (entity) {
                            return entity.name.toLowerCase().indexOf(escape(msg.query.toLowerCase())) !== -1;
                        }), //sets data
                        http$: {status: 200}}); //sets http status
                }
            });
        } else {
            console.error('SEARCH: Wrong Parameter');
            respond(null, {error: 'Wrong parameter', http$: {status:404}}); //returns error and a http status 404
        }
    }
};
