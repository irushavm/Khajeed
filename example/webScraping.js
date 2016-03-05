var request = require('request');
var cheerio = require('cheerio');


var url = 'http://m.kijiji.ca/old-video-games/ottawa/f?categoryId=623&locationId=1700185';

request(url, function(error, response, html){

  if(!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      var $ = cheerio.load(html);
      $('li.searchResultElem').each(function(i, elm){ // Go through each of the top ads and the regular ads

        var data = $(elm); // This holds all the data for a single listing
        console.log(data.find('.title').text().replace(/\s/g, ' '));
        console.log(data.find('.price').text().replace(/\s/g, ''));
        console.log(data.find('.posteddate').text().replace(/\s/g, ''));
        console.log(data.find('a').prop('href')+'\n');
      

      });
      // Finally, we'll define the variables we're going to capture
  }
});
