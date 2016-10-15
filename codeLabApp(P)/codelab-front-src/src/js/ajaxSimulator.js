module.exports = function(obj,url){
  var iurl = url || 'a url';
  var data = {};
  data.get = function(){
    console.log('get from ' + iurl);

    if(obj){
      window.setTimeout(function(obj){
        obj = 'something from server';
      },200);
    }else{
      console.log('You should use ajax.get(obj,url)');
      return 'something default';
    }
  }

  return data;
};
