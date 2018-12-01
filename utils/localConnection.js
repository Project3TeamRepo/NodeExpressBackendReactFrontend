var displayed_articles = [];
var saved_articles = [];

function articleAlreadyExists(articles, id) {
    if(!articles || !id) {
        return false;
    } else {
        return (articles.filter(a => a.articleId === id).length > 0);
    }
}

function saveArticle(id, cb) {
    if(id) {
        let res = !(articleAlreadyExists(saved_articles.map(sa => sa.article), id));
        if(res) {
            let found_articles = displayed_articles.filter(a => a.articleId === id);
            if(found_articles.length > 0) {
                let article = found_articles[0];
                displayed_articles = displayed_articles.filter(a => a.articleId !== id);
                saved_articles.push({article: article});
            } else {
                cb(false);
            }
        } else {
            cb(false);
        }
        cb(res);
    } else {
        cb(false);
    }
}

function getSavedArticles(cb) {
    cb(saved_articles.map(sa => sa.article).slice());
}

function getDisplayedArticles(cb) {
    cb(displayed_articles.slice());
}

function clearSavedArticles() {
    saved_articles = [];
}

function clearDisplayedArticles() {
    displayed_articles = [];
}

function removeSavedArticle(id, cb) {
    let res = articleAlreadyExists(saved_articles.map(sa => sa.article), id);
    if(res) {
        let article = saved_articles.map(sa => sa.article).filter(a => a.articleId === id)[0];
        saved_articles = saved_articles.filter(sa => sa.article.articleId !== id);
        displayed_articles.push(article); 
    }
    cb(res);
}

function storeDisplayedArticles(articles, cb) {
    if(articles && articles.length > 0) {
        let currently_saved_articles = saved_articles.map(sa => sa.article);
        articles.forEach(article => {
            if(!articleAlreadyExists(displayed_articles.concat(currently_saved_articles), article.articleId)) {
                displayed_articles.push(article);
            }
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