$(document).ready(function() {
    nunjucks.configure({
        autoescape: true,
        web: {
            async: true
        }
    });
    $.ajax({
        url: "./mockapi/getAllArticles.json",
        success: function(data, status) {
            for (item in data.articles) {
                nunjucks.render('./partials/article.html', data.articles[item], function(err, res) {
                    $('.js-articles').append(res);
                });
            }
        }
    });
    $(".js-burger").click(function() {
        $(".js-sidebar").slideToggle(300);
    });
});
