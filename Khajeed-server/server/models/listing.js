var request = require('request');
var cheerio = require('cheerio');

module.exports = function(Listing) {
  Listing.getList = function (cb) {
    //Find Listing model from Datasource
    Listing.find({},function (err,result) {
      if(err) {
        return cb(new Error('webScrape Model Update Failed',result));
      }
      return cb(null,{status:'success','data':result});
    });
  };


  Listing.invokeScrape = function (cb) {
    
    var url = 'http://m.kijiji.ca/old-video-games/ottawa/f?categoryId=623&locationId=1700185';
    request(url, function(error, response, html){

      if(!error){
          // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
          var $ = cheerio.load(html);
          $('li.searchResultElem').each(function(i, elm){ // Go through each of the top ads and the regular ads
            var newModel = {};
            var data = $(elm); // This holds all the data for a single listing
            newModel.title = data.find('.title').text().replace(/\s/g, ' ');
            newModel.price = data.find('.price').text().replace(/\s/g, '');
            var tempDate = data.find('.posteddate').text().replace(/\s/g, '').split('-');
            console.log('************TEMP-DATE: ', tempDate.length);
            if (tempDate[0] === '' || tempDate[1] === '') {
              newModel.postDate = new Date().toISOString();
            }
            else {
              var timeNow = new Date().toISOString().split('T')[1];
              newModel.postDate = '2016-'+tempDate[1]+'-'+tempDate[0]+'T'+timeNow;
            }
            newModel.imageLink = data.find('img').prop('data-src');
            newModel.link = data.find('a').prop('href');
            console.log(newModel);
            Listing.upsert(newModel, function (err, data) {
              console.log(err, data);
              if(err) {
                return cb(new Error('webScrape Model Update Failed',data));
              }
            });
          });

          return cb(null,{'status':'success','data':'Models added successfully'});
      }

    });
  };

  Listing.remoteMethod('getList',
    {
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/getList', verb: 'get'}
    }
  );// End remoteMethod

  Listing.remoteMethod('invokeScrape',
    {
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/invokeScrape', verb: 'post'}
    }
  );// End remoteMethod


};//end module export
