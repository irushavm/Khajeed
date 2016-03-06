var request = require('request');
var cheerio = require('cheerio');
module.exports = function(Listing) {

  Listing.getSavedList = function (prefId,cb) {
    var error;
    if(!prefId) {
      error = new Error('Parameters Missing');
      error.statusCode = 400;
      error.code = 'PARAMETERS_MISSING';
      return cb(error);
    }
    //Find List of Saved Queries
    Listing.find({
      fields:['title','imageLink','name','price','id'],
      where:{
        and:[{userId:Listing.app.currentUserId},{itemSaved:true},{preferenceId:prefId}]
      }
    },function (err,result) {
      if(err) {
        error = new Error('Saved Listing Get Failed '+err);
        error.statusCode = 500;
        error.code = 'PARAMETERS_MISSING';
        return cb(error);
      }
      return cb(null,{status:'success','data':result});
    });
  };

  Listing.getSearchedList = function (prefId,cb) {
    var error;
    if(!prefId) {
      error = new Error('Parameters Missing');
      error.statusCode = 400;
      error.code = 'PARAMETERS_MISSING';
      return cb(error);
    }
    //Find List of the selected Search Query
    console.log('*****************PREFID*****'+prefId);
    Listing.find({
      fields:['title','imageLink','name','price','id'],
      where: {
        userId:Listing.app.currentUserId
      }
    },function (err,result) {
      if(err) {
        error = new Error('Searched Listing Get Failed '+err);
        error.statusCode = 500;
        error.code = 'SEARCHED_LISTING_GET_FAILED';
        return cb(error);
      }
      return cb(null,{status:'success','data':result});
    });
  };

  Listing.getDetails = function (listingId,cb) {
    var error;
    if(!listingId) {
      error = new Error('Parameters Missing');
      error.statusCode = 400;
      error.code = 'PARAMETERS_MISSING';
      return cb(error);
    }
    //Find Listing details
    Listing.findOne({
      where: {
        id: listingId,
        userId:Listing.app.currentUserId
      }
    },function (err,result) {
      if(err) {
        error = new Error('Listing Details Get Failed ',err);
        error.statusCode = 500;
        error.code = 'LISTING_DETAILS_GET_FAILED';
        return cb(error);
      }

      request(result.link, function(error, response, html){
        if(err) {
          error = new Error('Scraping Listing Details Failed ',err);
          error.statusCode = 500;
          error.code = 'SCRAPING_LISTING_DETAILS_FAILED';
          return cb(error);
        }

        var $ = cheerio.load(html);

        var listDesc = $('#adDescription').text();

        result.itemRead = true;
        Listing.upsert(result, function (err, upsertResponse){
          if(err) {
            error = new Error('Listing Details Update Failed ',err);
            error.statusCode = 500;
            error.code = 'LISTING_DETAILS_UPDATE_FAILED';
            return cb(error);
          }
          upsertResponse.description = listDesc;
          return cb(null,{status:'success','data':upsertResponse});
        });
      });
    });
  };

  Listing.saveListing = function (listingId,cb) {
    var error;
    //Find Listing details
    Listing.findOne({
      where: {
        and:[
          {id: listingId},
          {userId:Listing.app.currentUserId}
        ]
      }
    },function (err,result) {
      if(err) {
        error = new Error('Listing Details Get Failed ',err);
        error.statusCode = 500;
        error.code = 'LISTING_DETAILS_GET_FAILED';
        return cb(error);
      }
      result.itemRead = true;
      result.itemSaved = true;
      Listing.upsert(result, function (err, upsertResponse){
        if(err) {
          error = new Error('Listing Details Update Failed ',err);
          error.statusCode = 500;
          error.code = 'LISTING_DETAILS_UPDATE_FAILED';
          return cb(error);
        }
        return cb(null,{status:'success','data':'Listing Saved Successfully'});
      });
    });
  };

  Listing.removeListing = function (listingId,cb) {
    var error;
    //Find Listing details
    Listing.destroyAll({
      and:[
        {id: listingId},
        {userId:Listing.app.currentUserId}
      ]
    },function (err,result) {
      if(err) {
        error = new Error('Listing Remove Failed ',err);
        error.statusCode = 500;
        error.code = 'LISTING_REMOVE_FAILED';
        return cb(error);
      }
      console.log(result);
      return cb(null,{status:'success','data':'Listing Removed Successfully'});
    });
  };

  Listing.remoteMethod('getSearchedList',
    {
      accepts: {arg: 'prefId', type: 'string'},
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/getSearchedList', verb: 'get'}
    }
  );// End remoteMethod


  Listing.remoteMethod('getSavedList',
    {
      accepts: {arg: 'prefId', type: 'string'},
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/getSavedList', verb: 'get'}
    }
  );// End remoteMethod


  Listing.remoteMethod('getDetails',
    {
      accepts: {arg: 'listingId', type: 'string'},
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/getDetails', verb: 'get'}
    }
  );// End remoteMethod


  Listing.remoteMethod('saveListing',
    {
      accepts: {arg: 'listingId', type: 'string'},
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/saveListing', verb: 'post'}
    }
  );// End remoteMethod

  Listing.remoteMethod('removeListing',
    {
      accepts: {arg: 'listingId', type: 'string'},
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/removeListing', verb: 'post'}
    }
  );// End remoteMethod

};//end module export
