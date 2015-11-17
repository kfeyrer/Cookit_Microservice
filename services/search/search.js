var seneca = require('seneca')(),
    dbConfig = require('../../db_conf'),
    _ = require('lodash');

seneca.use('mysql-store', dbConfig);
module.exports = function search( options ) {

    this.add( 'role:search,cmd:search', search);

    function search(msg, respond) {
        if (msg.query) {
            var recipes = seneca.make$('recipes');
            recipes.list$({}, function (err, entities) {
                if (err) {
                    console.error('SEARCH: ' + err);
                    respond(null, {error: err, http$: {status:404}});
                }
                else {
                    respond(null, {
                        data: _.map(entities, function (entity) {
                            entity = entity.data$();
                            return {
                                id: entity.id,
                                name: entity.name,
                                ingredients: entity.ingredients,
                                description: entity.description
                            };
                        }).filter(function (entity) {
                            return entity.name.toLowerCase().indexOf(escape(msg.query.toLowerCase())) !== -1;
                        }),
                        http$: {status: 200}});
                }
            });
        } else {
            console.error('SEARCH: Wrong Parameter');
            respond(null, {error: 'Wrong parameter', http$: {status:404}});
        }
    }
};
