var express    = require("express"),
    seneca = require('seneca')(),
    dbConfig = require('./conf/db_recipe'),
    _ = require('lodash'),
    app = express();

seneca.use('mysql-store', { name:'cookit',
    host:'localhost',
    user:'root',
    password:'M22092013k',
    port:9249})
    .use( 'api' )
    .client( { type:'tcp', pin:'role:search', port: '4000' } )
    .client( { type:'tcp', pin: 'role:recipes', port: '4001' })
    .client( { type:'tcp', pin: 'role:auth', port: '4002' });

seneca.ready(function () {
    //get table
    var recipes = seneca.make$('recipes');
    recipes.name = 'test';
    recipes.ingredients = '1 Ei';
    recipes.description = 'blabla';
    //add entry
    //recipes.save$(function (err, apple) {
    //    if(err) {
    //        console.log(err);
    //    } else {
    //        console.log("apple.id = " + apple.id)
    //    }
    //});

    //list entries
    recipes.list$({}, function(err, entities) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(_.filter(entities, function(entity) {
                entity = entity.data$();
                return entity.name.toLowerCase().indexOf('test'.toLowerCase()) !== -1;
            }));
        }
    });

});

app.use( require('body-parser').json())
    .use( seneca.export( 'web' ) )
    .listen(3000);