var request = require('request');
var cheerio = require('cheerio');
var CronJob = require("cron").CronJob;

// function func(city, category) {
//   city = options[city];
//   category = options[category];

//   var url = 'http://m.kijiji.ca/old-video-games/ottawa/f?categoryId='+category+'&locationId='+city;
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
//   })
// }

// var options = {}
// options["ottawa"] = "1700185";
// options["toronto"] = "1700273";
// options["kingston"] = "1700183";
// options["montreal"] = "1700281";
// options["london"] = "1700214";
// options["calgary"] = "1700199";
// options["winnipeg"] = "1700192";
// options["vancouver"] = "1700287";
// options["regina"] = "1700196";
// options["halifax"] = "1700321";
// options["cars"] = "174";
// options["bikes"] = "644";
// options["videogames"] = "141";
// options["homes"] = "1700281";
// options["tablets"] = "776";
// options["cellphones"] = "760";
// options["tickets"] = "14";
// options["books"] = "109";
// options["missedconnections"] = "636";
// options["rideshares"] = "5";
// options["lostandfound"] = "120";

// func("toronto", "cellphones");

// var CronJob = require('cron').CronJob;
// new CronJob('* * * * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'America/Los_Angeles');


var url = 'http://m.kijiji.ca/cell-phone/city-of-toronto/lg3/v?adId=1145262041&ck=CK&from=Search&ts=1457207048524';
request(url, function(error, response, html){

  if(!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
      var $ = cheerio.load(html);
      // var data = $('div.viewdiv').html();

      // console.log("TEST");
      console.log($('span.adTitle').text().replace(/\s/g, ' '));
      console.log($('span.adPrice').text().replace(/\s/g, ' '));
      console.log($('#pic').contents());
      console.log($('#adDescription').text());
    // Finally, we'll define the variables we're going to capture
  }
})