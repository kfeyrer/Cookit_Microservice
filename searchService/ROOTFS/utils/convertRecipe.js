const _ = require('lodash');
//convertsRecipe data from unreadable data to an Array with RecipeObjects
module.exports = function convertRecipe( entities ) {
    return _.map(entities, function (entity) {
        entity = entity.data$();
        return {
            id: entity.id,
            name: entity.name,
            ingredients: entity.ingredients,
            description: entity.description
        };
    });
};