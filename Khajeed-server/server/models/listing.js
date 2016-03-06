var request = require('request');
var cheerio = require('cheerio');
module.exports = function(Listing) {

  Listing.getSavedList = function (prefId,cb) {
    //Find List of Saved Queries
    Listing.find({
      fields:['title','imageLink','name','price','id'],
      where:{
        and:[{userId:Listing.app.currentUserId},{itemSaved:true},{preferenceId:prefId}]
      }
    },function (err,result) {
      if(err) {
        return cb(new Error('Saved Listing Get Failed',result));
      }
      return cb(null,{status:'success','data':result});
    });
  };

  Listing.getSearchedList = function (prefId,cb) {
    //Find List of the selected Search Query
    Listing.find({
      fields:['title','imageLink','name','price','id'],
      where: {
        userId:Listing.app.currentUserId
      }
    },function (err,result) {
      if(err) {
        return cb(new Error('Searched Listing Get Failed',result));
      }
      return cb(null,{status:'success','data':result});
    });
  };

  Listing.getDetails = function (listingId,cb) {
    //Find Listing details
    Listing.findOne({
      where: {
        id: listingId,
        userId:Listing.app.currentUserId
      }
    },function (err,result) {
      if(err) {
        return cb(new Error('Listing Details Get Failed',result));
      }

      request(result.link, function(error, response, html){
        if(err) {
          return cb(new Error('Scraping Listing Details Failed',result));
        }

        var $ = cheerio.load(html);

        var listDesc = $('#adDescription').text();

        result.itemRead = true;
        Listing.upsert(result, function (err, upsertResponse){
          if(err) {
            return cb(new Error('Listing Details Update Failed',result));
          }
          upsertResponse.description = listDesc;
          return cb(null,{status:'success','data':upsertResponse});
        });
      });
    });
  };

  Listing.saveListing = function (listingId,cb) {
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
        return cb(new Error('Listing Details Get Failed',result));
      }
      result.itemRead = true;
      result.itemSaved = true;
      Listing.upsert(result, function (err, upsertResponse){
        if(err) {
          return cb(new Error('Listing Details Update Failed',result));
        }
        return cb(null,{status:'success','data':'Listing Saved Successfully'});
      });
    });
  };

  Listing.removeListing = function (listingId,cb) {
    //Find Listing details
    Listing.destroyAll({
      and:[
        {id: listingId},
        {userId:Listing.app.currentUserId}
      ]
    },function (err,result) {
      if(err) {
        return cb(new Error('Listing Remove Failed',result));
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
      http: {path: '/saveListing', verb: 'get'}
    }
  );// End remoteMethod

  Listing.remoteMethod('removeListing',
    {
      accepts: {arg: 'listingId', type: 'string'},
      returns: {arg: 'response', type: 'object', http: {source:'root'}},
      http: {path: '/removeListing', verb: 'get'}
    }
  );// End remoteMethod



};//end module export
