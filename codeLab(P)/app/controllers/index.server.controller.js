exports.render = function (req,res) {
  if(req.session.lastVisit){
    console.log(req.session.lastVisit);
  }
  res.render('index',{
    title:'Hello views'
  });
};
