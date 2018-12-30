var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];

function init() { //called when API is loaded
    loadFeed(0);
}

function loadFeed(id, cb) {
     var feedUrl = allFeeds[id].url,
         feedName = allFeeds[id].name;

     $.ajax({
       type: "POST",
       url: 'https://rsstojson.udacity.com/parseFeed',
       data: JSON.stringify({url: feedUrl}),
       contentType:"application/json",
       success: function (result, status){

                 var container = $('.feed'),
                     title = $('.header-title'),
                     entries = result.feed.entries,
                     entriesLen = entries.length,
                     entryTemplate = Handlebars.compile($('.tpl-entry').html());

                 title.html(feedName);
                 container.empty();

                 entries.forEach(function(entry) {
                     container.append(entryTemplate(entry)); //parse entry against the entryTemplate and append to the list of entries
                 });

                 if (cb) {
                     cb();
                 }
               },
       error: function (result, status, err){
                 if (cb) { //run only the callback without attempting to parse result due to error
                     cb();
                 }
               },
       dataType: "json"
     });
	 
 }

google.setOnLoadCallback(init);

$(function() {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed)); //parse that feed against the feedItemTemplate (created above using Handlebars) and append it to the list of all available feeds within the menu

        feedId++;
    });

    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });
}()); //ensure it doesn't execute until the DOM is ready