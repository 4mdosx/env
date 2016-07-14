(function(){
  var bgList = document.getElementsByClassName("change-bg")[0].childNodes[1].childNodes;
  bgList = Array.prototype.filter.call(bgList,function(obj) {
    return obj.nodeType !== 3;
  });
  var target = [];
  var header = document.getElementsByClassName("decover")[0];
  var fullpage = document.getElementsByClassName("fullpage")[0];

  var img = document.getElementsByClassName("fullpage-img")[0];

  var height = -262;
  bgList.forEach(function(element) {
    element.addEventListener('click',function() {
      bg = this.attributes['style'].value;
      header.setAttribute('style',bg);
      fullpage.setAttribute('style',bg);
      height -= 50;
      img.style.marginTop = height + "px"
    })
  }, this);
})();
