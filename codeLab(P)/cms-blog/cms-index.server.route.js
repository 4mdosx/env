module.exports = function(app){
  var cms-ctrl = require('./cms-index.server.controller.js');

  app.get('/admin', function (req, res, next) {
    console.log('inedex had get');
  });

  app.get('/admin/article', function (req, res, next) {
      var id = req.query.id
      db.Article.findOne({_id: id}, function (err, doc) {
          if (err) {
              return console.log(err)
          } else if (doc) {
              res.send(doc)
          }
      })
  })

  app.get('/admin/articleList', function (req, res, next) {
      db.Article.find(null, 'title date', function (err, doc) {
          if (err) {
              return console.log(err)
          } else if (doc) {
              res.send(doc)
          }
      })
  })

  app.post('/admin/login', function (req, res, next) {
      var name = req.body.userName,
          password = req.body.password,
          resBody = {state: ''}
      db.User.findOne({name: name}, 'password', function (err, doc) {
          if (err) {
              return console.log(err)
          } else if (!doc) {
              resBody.state = '账号不存在'
              res.send(resBody)
          } else if (doc.password === password) {
              resBody.state = '登陆成功'
              res.send(resBody)
          } else {
              resBody.state = '密码错误'
              res.send(resBody)
          }
      })
  })

  app.post('/admin/save', function (req, res, next) {
      if (req.body.id) {
          var obj = {
              title: req.body.title,
              date: req.body.date,
              content: req.body.input
          }

          db.Article.findByIdAndUpdate(req.body.id, obj, function () {
          })
      } else {
          var newArticle = new db.Article({
              title: req.body.title,
              date: req.body.date,
              content: req.body.input
          })
          newArticle.save(function (err) {
              if (err)return console.log(err)
          })
      }
      res.send('OK')
  })

  app.post('/admin/getLinks', function (req, res, next) {
      db.Link.find(null, function (err, doc) {
          if (err) {
              return console.log(err)
          } else if (doc) {
              res.send(doc)
          }
      })
  })

  app.post('/admin/setLinks', function (req, res, next) {
      db.Link.remove(null, function (err) {})
      req.body.links.forEach(function (item) {
          new db.Link({
              name: item.name,
              href: item.href
          }).save(function (err) {
              if (err)return console.log(err)
          })
      })
      res.send('ok')
  })

  app.post('/admin/savePw', function (req, res, next) {
      var name = req.body.userName,
          password = req.body.password
      db.User.findOneAndUpdate({name: name},
          {password:password},
          function () {})
      res.send('ok')
  })

  app.post('/admin/delete', function (req, res, next) {
      db.Article.findByIdAndRemove(req.body.id, function (err) {
          console.log(err)
      })
      res.send('ok')
  })
};
