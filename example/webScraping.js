var request = require('request');
var cheerio = require('cheerio');


var url = 'http://m.kijiji.ca/old-video-games/ottawa/f?categoryId=623&locationId=1700185';

request(url, function(error, response, html){

  if(!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      //console.log(html);
      var $ = cheerio.load(html);
      console.log('**************\nSECOND-TEST');
      $('li.searchResultElem').each(function(i, elm){

        var data = $(elm);

        console.log(data.text());


      });
      // Finally, we'll define the variables we're going to capture
  }
});
