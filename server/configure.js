var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    moment = require('moment');
    // errorHandler = require('errorHandler');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended': true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('aeonify'));
  app.use('/public', express.static(path.join(__dirname, '../public')));
  app.set('view engine', 'handlebars');

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
    timeago: function(timestamp) {
    return moment(timestamp).startOf('minute').fromNow();
    }
    }
    }).engine);

  if('development' === app.get('env')) {
    // app.use(errorHandler());
  }

  routes(app);

  return app;
};