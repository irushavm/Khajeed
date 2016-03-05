module.exports = function(Listing) {
  Listing.getList = function (cb) {
    return cb(null,[{
      title:'test',
      link:'http://google.com',
      imageLink:'http://google.ca',
      price: 'Please Contact',
      postDate: '03-04'
    }]);
  }

  Listing.remoteMethod('getList',
    {
      returns: {arg: 'list', type: 'array'},
      http: {path: '/getList', verb: 'get'}
    }
  );// End remoteMethod

};//end module export
