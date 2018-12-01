const Article = require("../model/article.js");

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mongoDB = process.env.MONGODB_URI || process.env.MONGOHQ_URL;
    
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var ArticleModel = mongoose.model('Article',
    new Schema({
        articleId: {
            type: Number
        },
        headline: {
            type: String
        },
        description: {
            type: String
        },
        original_article: {
            type: String
        }
    }),
    'displayed_nyt_articles'
);

var SavedArticleModel = mongoose.model('SavedArticle',
    new Schema({
        articleId: {
            type: Number
        },
        headline: {
            type: String
        },
        description: {
            type: String
        },
        original_article: {
            type: String
        }
    }),
    'saved_nyt_articles'
);

function saveArticle(id, cb) {
    if(id) {
        SavedArticleModel.countDocuments({articleId: id}, function(saError, count) {
            if(count === 0) {
                ArticleModel.findOne({articleId: id}, function(amError, articleDoc) {
                    if(articleDoc) {
                        let article = articleDoc.toObject({getters: true});
                        let savedArticleToStore = new SavedArticleModel({
                            articleId: article.articleId,
                            headline: article.headline,
                            description: article.description,
                            original_article: article.original_article});
                        savedArticleToStore.save(function(insertError) {
                            if(insertError) {
                                cb(false);
                            } else {
                                ArticleModel.remove({articleId: id}, function(error) {
                                });
                                cb(true);
                            }
                        });    
                    } else {
                        cb(false);
                    }
                });
            } else {
                cb(false);
            }
        });
    } else {
        cb(false);
    }
}

function getSavedArticles(cb) {
    SavedArticleModel.find({}, function(error, result) {
        var articles = [];
        result = result.map(o => o.toObject());
        result.forEach(sa => {
            articles.push({article: {articleId: sa.articleId, headline: sa.headline, description: sa.description, original_article: sa.original_article}});        
        });
        cb(articles.map(sa => sa.article));
    });   
}

function getDisplayedArticles(cb) {
    ArticleModel.find({}, function(error, result) {
        var articles = [];
        result = result.map(o => o.toObject());
        result.forEach(a => {
            articles.push(new Article(a.articleId, a.headline, a.description, a.original_article));
        })
        cb(articles);
    });
}

function clearSavedArticles() {
    SavedArticleModel.remove({}, function(error) {});
}

function clearDisplayedArticles() {
    ArticleModel.remove({}, function(error) {});
}

function removeSavedArticle(id, cb) {
    if(id) {
        console.log("trying to remove " + id);
        SavedArticleModel.findOne({articleId: id}, function(saError, savedArticleDoc) {
            if(!saError) {
                let savedArticle = savedArticleDoc.toObject({getters : true});
                console.log("id found: " + JSON.stringify(savedArticle));
                var articleToSave = new ArticleModel({
                    articleId: savedArticle.articleId,
                    headline: savedArticle.headline,
                    description: savedArticle.description,
                    original_article: savedArticle.original_article});
                articleToSave.save(function(amError) {
                    console.log("Trying to save article back to displayed");
                    if(!amError) {
                        console.log("Article successfully removed");
                        SavedArticleModel.remove({articleId: id}, function(error) {});
                        cb(true);
                    } else {
                        console.log("Error while trying to save article");
                        cb(false);
                    }
                });
            } else {
                console.log("Error while trying to find article ");
                cb(false);
            }
        });
    } else {
        console.log("invalid id");
        cb(false);
    }
}

function storeDisplayedArticles(articles, cb) {
    if(articles && articles.length > 0) {
        articles.forEach(article => {
            SavedArticleModel.countDocuments({articleId: article.articleId}, function(saError, saCount) {
                if(saCount === 0) {
                    ArticleModel.countDocuments({articleId: article.articleId}, function(amError, amCount) {
                        if(amCount === 0) {
                            let articleToStore = new ArticleModel({
                                articleId: article.articleId,
                                headline: article.headline,
                                description: article.description,
                                original_article: article.original_article
                            })
                            articleToStore.save(function(error) {
                            });
                        }
                    });
                }
            });
        });
        cb(true);
    } else {
        cb(false);
    }
}

var news_scraper_db = {
    storeDisplayedArticles: storeDisplayedArticles,
    clearDisplayedArticles: clearDisplayedArticles,
    getDisplayedArticles: getDisplayedArticles,
    saveArticle: saveArticle,
    getSavedArticles: getSavedArticles,
    clearSavedArticles: clearSavedArticles,
    removeSavedArticle: removeSavedArticle
}

module.exports = news_scraper_db;