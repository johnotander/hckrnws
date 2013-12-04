// Adapted from https://github.com/etcet/HNES/blob/master/js/hn.js

$(document).ready(function() {
  
  $().makeHeaderPretty();

  if($().isCommentsPage()) {
    $().makeCommentsPagePretty();
  } else {
    $().makeArticlesPretty();
  }
});

$.fn.makeHeaderPretty = function() {
  $('body > center > table > tbody > tr:first-child').attr('id', 'header');

  $('#header td').removeAttr('bgcolor');
  $('#header > td > table > tbody > tr > td:first-child').removeAttr('style').attr('id', 'img-wrapper');
  $('#header > td > table > tbody > tr > td:nth-child(2)').removeAttr('style').attr('id', 'title');
}

$.fn.makeArticlesPretty = function() {
  $('body > center > table > tbody > tr:nth-child(3)').attr('id', 'articles');
  $('body > center > table > tbody > tr:nth-child(2)').remove();
  $().nukeArticlesBodyAndReplaceWithUl();
}

$.fn.nukeArticlesBodyAndReplaceWithUl = function() {
  var articleTrs = $('#articles > td > table tr').toArray();
  $('#articles').html("<ol id='articles-list'></ol>");

  for(var i = 0; i < articleTrs.length; i += 3) {    
    $('#articles-list').append($().createLiFromTitleAndDetails(articleTrs[i], articleTrs[i+1]));
  }
}

$.fn.createLiFromTitleAndDetails = function(currTitle, currDetails) {
  if(!$(currTitle).find('.title').length) return;

  console.log(currTitle);
  console.log(currDetails);

  return "<li>" + 
            $().getLinkFromTitle(currTitle);
         "</li>";
}

$.fn.getLinkFromTitle = function(currTitle) {
  return "<a href='" + $(currTitle).find('.title a').attr('href') + "'>" + $(currTitle).find('.title a').text() + "</a>" +
}

$.fn.makeCommentsPagePretty = function() {
  $('body > center > table > tbody > tr:nth-child(2)').remove();

  $('body > center > table > tbody > tr:nth-child(2)').attr('id', 'comment');
  $('#comment > td > table:eq(0) > tbody > tr:eq(0)').addClass('article-title');
  $('#comment > td > table:eq(0) > tbody > tr:nth-child(2)').addClass('article-details');
  $('#comment > td > table:eq(0) > tbody > tr:nth-child(3)').remove();
  $('#comment > td > table:eq(0) > tbody > tr:nth-child(3)').attr('id', 'add-comment-wrapper');
  $('#comment > td > table:eq(1)').attr('id', 'comments-box-wrapper');
  $('#comment > td > table:eq(1) > tbody > tr').addClass('comments-box');
}

$.fn.isCommentsPage = function() {
  return $('body > center > table > tbody > tr:nth-child(3) > td > table tr:nth-child(4) td form').length > 0;
}
