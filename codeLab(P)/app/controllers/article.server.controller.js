var Data = require('../models/article.server.model.js'),
    data = Data();


exports.render = function (req,res) {
    console.log(data.toString());
    res.render('article',{
      count:"1"
    });
};
