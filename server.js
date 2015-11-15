var express    = require("express"),
    mysql      = require('mysql'),
    seneca = require('seneca')(),
    dbConfig = require('./db_conf'),
    app = express();

seneca.use('mysql-store', dbConfig);

seneca.ready(function () {
    //get table
    var recipes = seneca.make$('recipes');
    recipes.name = 'test';
    recipes.ingredients = '1 Ei';
    recipes.description = 'blabla';
    //add entry
    recipes.save$(function (err, apple) {
        if(err) {
            console.log(err);
        } else {
            console.log("apple.id = " + apple.id)
        }
    });

    //list entries
    recipes.list$({}, function(err, entity) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(entity);
        }
    });

});

app.listen(8001);