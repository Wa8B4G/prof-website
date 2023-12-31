const User = require('../module/User');

exports.login = function (req, res) {
    let user = new User(req.body)
        user.login().then(function (result) {
          req.session.user = {favColor: "blue", name: user.data.name};
          req.session.save(function () {
            res.redirect('/')
          });
          
        }).catch(function (e) {
          req.flash('errors', e);
          req.session.save(function () {
            res.redirect('/')
          });         
        });
    
    
};

exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
};

exports.register = function (req, res) {
    let user = new User(req.body);
    user.register();
    if (user.errors.length) {
        res.send(user.errors)
        
      } else {
        res.redirect("/")
      }
    
};

exports.home = function (req, res) {
  
  if (req.session.user) {
    res.render('home', {username: req.session.user.name})
  } else {
    res.render('home-guest',{errors: req.flash('errors')})
  }
    
    
};