var request = require('request');
var cheerio = require('cheerio');
var CronJob = require("cron").CronJob;

function func(city, category) {
  city = options[city];
  category = options[category];

  var url = 'http://m.kijiji.ca/old-video-games/ottawa/f?categoryId='+category+'&locationId='+city;
  request(url, function(error, response, html){

    if(!error){
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);
        $('li.searchResultElem').each(function(i, elm){ // Go through each of the top ads and the regular ads

          var data = $(elm); // This holds all the data for a single listing
          console.log(data.find('.title').text().replace(/\s/g, ' '));
          console.log(data.find('.price').text().replace(/\s/g, ''));
          console.log(data.find('.posteddate').text().replace(/\s/g, ''));
          console.log(data.find('img').prop('data-src'));
          console.log(data.find('a').prop('href')+'\n');

        });
        // Finally, we'll define the variables we're going to capture
    }
  })
}

var options = {}
options["ottawa"] = "1700185";
options["toronto"] = "1700273";
options["kingston"] = "1700183";
options["montreal"] = "1700281";
options["cars"] = "174";
options["bikes"] = "644";
options["videogames"] = "141";
options["homes"] = "1700281";

func("toronto", "videogames");

// Ottawa: 1700185
// Toronto: 1700273
// Kingston: 1700183
// Montreal: 1700281

// Cars: 174
// Bikes: 644
// Video games: 141
// Apartments/houses: 34

// var job = new CronJob('0 * * * *', function() {

//   var url = 'http://m.kijiji.ca/old-video-games/ottawa/f?categoryId=623&locationId=1700185';
//   request(url, function(error, response, html){

//     if(!error){
//         // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
//         var $ = cheerio.load(html);
//         $('li.searchResultElem').each(function(i, elm){ // Go through each of the top ads and the regular ads

//           var data = $(elm); // This holds all the data for a single listing
//           console.log(data.find('.title').text().replace(/\s/g, ' '));
//           console.log(data.find('.price').text().replace(/\s/g, ''));
//           console.log(data.find('.posteddate').text().replace(/\s/g, ''));
//           console.log(data.find('img').prop('data-src'));
//           console.log(data.find('a').prop('href')+'\n');

//         });
//         // Finally, we'll define the variables we're going to capture
//     }

//   }, function () {
//     /* This function is executed when the job stops */
//   },
//   true, /* Start the job right now */
//   timeZone /* Time zone of this job. */
// );


// });

// Ottawa: 1700185
// Toronto: 1700273
// Kingston: 1700183
// Montreal: 1700281

// Cars: 174
// Bikes: 644
// Video games: 141
// Apartments/houses: 34