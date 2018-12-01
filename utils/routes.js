//data source must be imported from somewhere else
var news_source = "abcde";

//connection config depends on environment
const isRunningInHeroku = (process.env.NODE && (process.env.NODE.indexOf("heroku") !== -1));

var db = (isRunningInHeroku) ? require("./dbConnection.js") : require("./localConnection.js");

function scrapeArticlesFromSource(source, db){
    return function (cb) {
        source.getArticles(function(articles) {
            db.storeDisplayedArticles(articles, function(cbRes) {
                db.getDisplayedArticles(function(displayed_articles) {
                    cb(displayed_articles);
                });
            });    
        });
    }
}

function saveArticle(db) {
    return function(id, cb) {
        db.saveArticle(id, function(res) {
            cb(res);
        });
    }
}

function removeSavedArticle(db) {
    return function(id, cb) {
        db.removeSavedArticle(id, function(res) {
            cb(res);
        });
    }
}

function getSavedArticles(db) {
    return function(cb) {
        db.getSavedArticles(cb);
    }
}

function clearSavedArticles(db) {
    return function() {
        db.clearSavedArticles();
    }
}

var news_scraper_service = {
    scrapeArticlesFromSource: scrapeArticlesFromSource(news_source, db),
    saveArticle: saveArticle(db),
    removeSavedArticle: removeSavedArticle(db),
    getSavedArticles: getSavedArticles(db),
    clearSavedArticles: clearSavedArticles(db)
}

module.exports = news_scraper_service;