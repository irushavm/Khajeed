var request = require('request');
var cheerio = require('cheerio');
var CronJob = require('cron').CronJob;

var listOfPrefs = {}

module.exports = function(Preference) {

  var PREF_LOCATIONS = {
    ottawa: '1700185',
    toronto: '1700273',
    kingston: '1700183',
    montreal: '1700281',
  };

  var PREF_CATEGORIES = {
    cars: '174',
    bikes: '644',
    videogames: '141'
  };

  Preference.getChoices = function (cb) {
    return cb(null,{status:'success','data':{'cities':PREF_LOCATIONS,'categories':PREF_CATEGORIES}});
  };

  Preference.getList = function(cb) {
    var error;
    //Find List of Saved Queries
    Preference.find({
      where:{
        userId:Preference.app.currentUserId
      }
    },function (err,result) {
      if(err) {
        error = new Error('Preference Listing Get Failed '+err);
        error.statusCode = 500;
        error.code = 'PREFERANCE_LISTING_GET_FAILED';
        return cb(error);
      }
      return cb(null,{status:'success','data':result});
    });
  };

  Preference.removeOne = function (prefId,cb) {
    var error;
    if(!prefId) {
      error = new Error('Parameters Missing');
      error.statusCode = 400;
      error.code = 'PARAMETERS_MISSING';
      return cb(error);
    }
    //Find List of Saved Queries
    Preference.app.models.Listing.destroyAll({
        and:[{userId:Preference.app.currentUserId},{preferenceId:prefId}]
    },function (err, listResult) {
      if(err) {
        error = new Error('Listings Remove for Preference Failed '+err);
        error.statusCode = 500;
        error.code = 'LISTING_REMOVE_FOR_PREFERENCE_FAILED';
        return cb(error);
      }
      Preference.destroyAll({
        and:[{userId:Preference.app.currentUserId},{id:prefId}]
      },function (err,result) {
        console.log(result);
        if(err) {
          error = new Error('Preference Remove Failed '+err);
          error.statusCode = 500;
          error.code = 'PREFERENCE_REMOVE_FAILED';
          return cb(error);
        }
        return cb(null,{status:'success','data':'Preference Successfully Removed'});
      });

    });
  };

  Preference.addOne = function (data,cb) {
    var error;
    if(!data.title || ! data.city || !data.category) {
      error = new Error('Parameters Missing');
      error.statusCode = 400;
      error.code = 'PARAMETERS_MISSING';
      return cb(error);
    }
    //Find List of Saved Queries
    var newModel = {
      title: data.title,
      city: data.city,
      category: data.category,
      keywords: data.keywords,
      filter: data.filter,
      userId:Preference.app.currentUserId
    };

    Preference.create(newModel,function (err,result) {
      var error;
      console.log(result);
      if(err) {
        error = new Error('Preference Addition Failed '+err);
        error.statusCode = 500;
        error.code = 'PREFERENCE_ADDITION_FAILED';
        return cb(error);
      }
        return cb(null,{status:'success','data':'Preference Successfully Added'});

    });
  };


  function getAndPushResults () {
      Preference.find({}), function(result) {
        result.forEach(
          )
      }
  } 

var CronJob = require('cron').CronJob;
new CronJob('* * * * *', function() {
  console.log('You will see this message every hour');
  Preference.find({},function(error,data){
      data.forEach(function(item) {
        invokeScrape(preference,function(error,response){
          if(error) {
            console.log(error);
          }
        });
      });

  });
}, null, true, 'America/Los_Angeles').start();


  function invokeScrape (preference,cb) {

    var url = 'http://m.kijiji.ca/old-video-games/ottawa/f?categoryId=' +
    PREF_CATEGORIES[preference.category] + '&locationId=' + PREF_LOCATIONS[preference.city]+'&q='+preference.keywords.join('+');
    console.log('************RUNNING SCRAPER');
    request(url, function(error, response, html) {

      if(!error){
          var currUID = Preference.app.currentUserId;

          //Web scraping the html page
          var $ = cheerio.load(html);
          $('li.searchResultElem').each(function(i, elm){ // Go through each of the top ads and the regular ads

            // Holds the web-scraped data
            var data = $(elm);
            var itemTitle = data.find('.title').text().replace(/\s/g, ' ');
            var itemImageLink = data.find('img').prop('data-src');

            //Check if the listing already exists in the database using the iamge link
            Preference.app.models.Listing.find({fields:['id'],where:{imageLink:itemImageLink}}, function (err, findResult) {
              if(err) {
                return cb(new Error('Listing Find Failed ', err));
              }

              //If no record of listing exists in database or if the title does not match a filter word
              if((!findResult.length)&&(preference.filter.replace(' ','').indexOf(itemTitle)>-1)) {
                var newModel = {
                  title: itemTitle,
                  price: data.find('.price').text().replace(/\s/g, ''),
                  imageLink:itemImageLink,
                  userId: currUID,
                  link: data.find('a').prop('href'),
                  itemRead: false,
                  itemSaved: false,
                  preferenceId:preference.id
                };
                var tempDate = data.find('.posteddate').text().replace(/\s/g, '').split('-');
                if (tempDate[0] === '' || tempDate[1] === '') {
                  newModel.postDate = new Date().toISOString();
                }
                else {
                  var timeNow = new Date().toISOString().split('T')[1];
                  newModel.postDate = '2016-'+tempDate[1]+'-'+tempDate[0]+'T'+timeNow;
                }
                Preference.app.models.Listing.create(newModel, function (err, data) {
                  if(err) {
                    error = new Error('webScrape Model Update Failed '+err);
                    error.statusCode = 500;
                    error.code = 'INVOKESCRAPE_MODEL_UPDATE_FAILED';
                    return cb(error);
                  }
                });
              }
            });//end find
          });//end forEach
          return cb(null,'ok');
      }

    });
  }

  Preference.remoteMethod('getChoices',
    {
       returns: {arg: 'response', type: 'object', http: {source:'root'}},
       http: {path: '/getChoices', verb: 'get'}
    }
  );// End remoteMethod

  Preference.remoteMethod('getList',
    {
       returns: {arg: 'response', type: 'object', http: {source:'root'}},
       http: {path: '/getList', verb: 'get'}
    }
  );// End remoteMethod

  Preference.remoteMethod('removeOne',
    {
      accepts: {arg: 'prefId', type: 'string'},
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/removeOne', verb: 'post'}
    }
  );// End remoteMethod


  Preference.remoteMethod('addOne',
    {
      accepts: { arg: 'data', type: 'object', http:{source:'body'}} ,
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/addOne', verb: 'post'}
    }
  );// End remoteMethod

};//end module export
