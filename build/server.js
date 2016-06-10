require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _stringify = __webpack_require__(3);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  __webpack_require__(4);
  
  var _path = __webpack_require__(5);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(6);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(7);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(8);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(9);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(10);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(11);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(12);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(13);
  
  var _prettyError = __webpack_require__(14);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(15);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _models = __webpack_require__(18);
  
  var _models2 = _interopRequireDefault(_models);
  
  var _schema = __webpack_require__(26);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(43);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(121);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(21);
  
  var _configureStore = __webpack_require__(122);
  
  var _configureStore2 = _interopRequireDefault(_configureStore);
  
  var _runtime = __webpack_require__(128);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  // eslint-disable-line import/no-unresolved
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  app.use(_passport2.default.initialize());
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false
  }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', {
    failureRedirect: '/login',
    session: false
  }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, {
      expiresIn: expiresIn
    });
    res.cookie('id_token', token, {
      maxAge: 1000 * expiresIn,
      httpOnly: true
    });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: {
        request: req
      },
      pretty: ("production") !== 'production'
    };
  }));
  
  var Wit = __webpack_require__(129).Wit;
  var actions = {
    say: function say(sessionId, context, message, cb) {
      console.log(message);
      cb();
    },
    merge: function merge(sessionId, context, entities, message, cb) {
      cb(context);
    },
    error: function error(sessionId, context, _error) {
      console.log(_error.message);
    }
  };
  var client = new Wit('KJN5XTUXGTW27DC7VJ4Y64QX6N7BZXA5', actions);
  var context = {};
  
  app.get('/api/bot', function (req, res, next) {
  
    /*client.message(req.query.message, context, (error, data) => {
      if (error) {
        console.log('Oops! Got an error: ' + error);
      } else {
    		var obj = {
    			  user: {
    	        avatar: '//pi.tedcdn.com/r/pe.tedcdn.com/images/ted/c9928d59974a7d5b8f8889794634cbded07ff266_1600x1200.jpg?c=1050%2C550&w=180',
    	      },
    	      text: JSON.stringify(data),
    	      time: new Date().getTime()
    		};
         console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
     		res.json(obj);
      }
    });*/
  
    client.converse('my-user-session-42', req.query.message, {}, function (error, data) {
      if (error) {
        console.log('Oops! Got an error: ' + error);
      } else {
  
        var obj = {
          user: {
            avatar: '//pi.tedcdn.com/r/pe.tedcdn.com/images/ted/c9928d59974a7d5b8f8889794634cbded07ff266_1600x1200.jpg?c=1050%2C550&w=180'
          },
          text: (0, _stringify2.default)(data.msg),
          time: new Date().getTime()
        };
  
        console.log('Yay, got Wit.ai response: ' + (0, _stringify2.default)(data));
        res.json(obj);
      }
    });
  });
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, statusCode, template, data, store;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = [];
                        statusCode = 200;
                        template = __webpack_require__(130); // eslint-disable-line global-require
  
                        data = {
                          title: '',
                          description: '',
                          css: '',
                          body: '',
                          entry: _assets2.default.main.js
                        };
  
  
                        if (true) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        store = (0, _configureStore2.default)({}, {
                          cookie: req.headers.cookie
                        });
  
  
                        store.dispatch((0, _runtime.setRuntimeVariable)({
                          name: 'initialNow',
                          value: Date.now()
                        }));
  
                        _context.next = 9;
                        return (0, _universalRouter.match)(_routes2.default, {
                          path: req.path,
                          query: req.query,
                          context: {
                            store: store,
                            insertCss: function insertCss(styles) {
                              return css.push(styles._getCss());
                            }, // eslint-disable-line no-underscore-dangle
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            }
                          },
                          render: function render(component) {
                            var status = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  
                            css = [];
                            statusCode = status;
                            data.state = (0, _stringify2.default)(store.getState());
                            data.body = _server2.default.renderToString(component);
                            data.css = css.join('');
                            return true;
                          }
                        });
  
                      case 9:
  
                        res.status(statusCode);
                        res.send(template(data));
  
                      case 11:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
    return function (_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(132); // eslint-disable-line global-require
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  true ? '' : err.stack
    }));
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  _models2.default.sync().catch(function (err) {
    return console.error(err.stack);
  }).then(function () {
    app.listen(_config.port, function () {
      console.log('The server is running at http://localhost:' + _config.port + '/');
    });
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(16);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(17);
  
  var _models = __webpack_require__(18);
  
  var _config = __webpack_require__(21);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 3;
                return _models.UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });
  
              case 3:
                userLogin = _context.sent;
  
                if (!userLogin) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;
  
              case 8:
                _context.next = 10;
                return _models.User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 10:
                user = _context.sent;
  
                done(null, {
                  id: user.id,
                  email: user.email
                });
  
              case 12:
                _context.next = 32;
                break;
  
              case 14:
                _context.next = 16;
                return _models.User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: _models.UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });
  
              case 16:
                users = _context.sent;
  
                if (!users.length) {
                  _context.next = 21;
                  break;
                }
  
                done(null, users[0]);
                _context.next = 32;
                break;
  
              case 21:
                _context.next = 23;
                return _models.User.findOne({ where: { email: profile._json.email } });
  
              case 23:
                _user = _context.sent;
  
                if (!_user) {
                  _context.next = 28;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;
  
              case 28:
                _context.next = 30;
                return _models.User.create({
                  email: profile._json.email,
                  emailVerified: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displaynName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 30:
                _user = _context.sent;
  
                done(null, {
                  id: _user.id,
                  email: _user.email
                });
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
      return function fooBar() {
        return ref.apply(this, arguments);
      };
    }();
  
    fooBar().catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserProfile = exports.UserClaim = exports.UserLogin = exports.User = undefined;
  
  var _sequelize = __webpack_require__(19);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _User = __webpack_require__(22);
  
  var _User2 = _interopRequireDefault(_User);
  
  var _UserLogin = __webpack_require__(23);
  
  var _UserLogin2 = _interopRequireDefault(_UserLogin);
  
  var _UserClaim = __webpack_require__(24);
  
  var _UserClaim2 = _interopRequireDefault(_UserClaim);
  
  var _UserProfile = __webpack_require__(25);
  
  var _UserProfile2 = _interopRequireDefault(_UserProfile);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _User2.default.hasMany(_UserLogin2.default, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  _User2.default.hasMany(_UserClaim2.default, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  _User2.default.hasOne(_UserProfile2.default, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  function sync() {
    return _sequelize2.default.sync.apply(_sequelize2.default, arguments);
  }
  
  exports.default = { sync: sync };
  exports.User = _User2.default;
  exports.UserLogin = _UserLogin2.default;
  exports.UserClaim = _UserClaim2.default;
  exports.UserProfile = _UserProfile2.default;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(20);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _config = __webpack_require__(21);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var sequelize = new _sequelize2.default(_config.databaseUrl, {
    define: {
      freezeTableName: true
    }
  });
  
  exports.default = sequelize;

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("sequelize");

/***/ },
/* 21 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  /* jscs:disable maximumLineLength */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(20);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(19);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var User = _sequelize4.default.define('User', {
  
    id: {
      type: _sequelize2.default.UUID,
      defaultValue: _sequelize2.default.UUIDV1,
      primaryKey: true
    },
  
    email: {
      type: _sequelize2.default.STRING(256),
      validate: { isEmail: true }
    },
  
    emailConfirmed: {
      type: _sequelize2.default.BOOLEAN,
      defaultValue: false
    }
  
  }, {
  
    indexes: [{ fields: ['email'] }]
  
  });
  
  exports.default = User;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(20);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(19);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserLogin = _sequelize4.default.define('UserLogin', {
  
    name: {
      type: _sequelize2.default.STRING(50),
      primaryKey: true
    },
  
    key: {
      type: _sequelize2.default.STRING(100),
      primaryKey: true
    }
  
  });
  
  exports.default = UserLogin;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(20);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(19);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserClaim = _sequelize4.default.define('UserClaim', {
  
    type: {
      type: _sequelize2.default.STRING
    },
  
    value: {
      type: _sequelize2.default.STRING
    }
  
  });
  
  exports.default = UserClaim;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(20);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(19);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UserProfile = _sequelize4.default.define('UserProfile', {
  
    userId: {
      type: _sequelize2.default.UUID,
      primaryKey: true
    },
  
    displayName: {
      type: _sequelize2.default.STRING(100)
    },
  
    picture: {
      type: _sequelize2.default.STRING(256)
    },
  
    gender: {
      type: _sequelize2.default.STRING(50)
    },
  
    location: {
      type: _sequelize2.default.STRING(100)
    },
  
    website: {
      type: _sequelize2.default.STRING(256)
    }
  
  });
  
  exports.default = UserProfile;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _me = __webpack_require__(28);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(30);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(39);
  
  var _news2 = _interopRequireDefault(_news);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(29);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(31);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(32);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return function resolveExtension(_x, _x2) {
      return ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.jade', '.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
    return function resolveFileName(_x3) {
      return ref.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(33);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(5);
  
  var _bluebird = __webpack_require__(34);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(35);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(36);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(37);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(27);
  
  var _ContentType = __webpack_require__(38);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var md = new _markdownIt2.default();
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.jade':
        htmlContent = _jade2.default.render(fmContent.body);
        break;
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    return (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref, _ref2) {
      var _this = this;
  
      var request = _ref.request;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref3, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref3 = _context3.sent;
                success = _ref3.success;
                fileName = _ref3.fileName;
                extension = _ref3.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var _fetch = __webpack_require__(40);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(42);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(34);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(41);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(21);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(27);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(46);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(83);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _chat = __webpack_require__(89);
  
  var _chat2 = _interopRequireDefault(_chat);
  
  var _contact = __webpack_require__(101);
  
  var _contact2 = _interopRequireDefault(_contact);
  
  var _login = __webpack_require__(105);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _register = __webpack_require__(109);
  
  var _register2 = _interopRequireDefault(_register);
  
  var _content = __webpack_require__(113);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _error = __webpack_require__(117);
  
  var _error2 = _interopRequireDefault(_error);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    children: [_home2.default, _chat2.default, _contact2.default, _login2.default, _register2.default, _content2.default, _error2.default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next;
      var render = _ref.render;
      var context = _ref.context;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                if (!(component === undefined)) {
                  _context.next = 5;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 5:
                return _context.abrupt('return', render((0, _jsx3.default)(_App2.default, {
                  context: context
                }, void 0, component)));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  // Child routes
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */

/***/ },
/* 44 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/jsx");

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(47);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(48);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(49);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(50);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(51);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(52);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(53);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(58);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(76);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(79);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _reactRedux = __webpack_require__(82);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Header2.default, {}); /**
                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                        *
                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                        *
                                                        * This source code is licensed under the MIT license found in the
                                                        * LICENSE.txt file in the root directory of this source tree.
                                                        */
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        if (this.props.error) {
          return this.props.children;
        }
  
        var store = this.props.context.store;
        return (0, _jsx3.default)(_reactRedux.Provider, {
          store: store
        }, void 0, (0, _jsx3.default)('div', {
          className: _App2.default.root
        }, void 0, _ref, this.props.children));
      }
    }]);
    return App;
  }(_react.Component);
  
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 49 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 50 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 52 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(54);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */html{color:#222;font-weight:100;font-size:1em;font-family:HelveticaNeue-Light,Segoe UI,sans-serif;line-height:1.375;box-sizing:border-box;background-color:#290300}._3AVL,body,html{height:100%}a{color:#0074c2}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:' (' attr(href) ')'}abbr[title]:after{content:' (' attr(title) ')'}a[href^='#']:after,a[href^='javascript:']:after{content:''}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3AVL"
  };

/***/ },
/* 55 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(32);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(3);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(57);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(31);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 57 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(60);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(69);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Header() {
    return (0, _jsx3.default)('div', {
      className: _Header2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Header2.default.container
    }, void 0, (0, _jsx3.default)(_Navigation2.default, {
      className: _Header2.default.nav
    })));
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(_Header2.default)(Header);

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(61);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Gi4{background:#fff;color:#fff;position:fixed;top:0;width:100%;z-index:1}._1rGb{margin:0 auto;padding:10px;max-width:1000px}._19ln{color:#92e5fc;text-decoration:none}._2mix{margin-left:10px}._1zCy{display:inline-block;margin-top:6px}._2Lc2{text-align:center}._2Qzp{margin:0;padding:10px;font-weight:400;font-size:4em;line-height:1em}._3mmk{padding:0;color:hsla(0,0%,100%,.5);font-size:1.25em;margin:0}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Gi4",
  	"container": "_1rGb",
  	"brand": "_19ln",
  	"brandTxt": "_2mix",
  	"nav": "_1zCy",
  	"banner": "_2Lc2",
  	"bannerTitle": "_2Qzp",
  	"bannerDesc": "_3mmk"
  };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(63);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(64);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(47);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(48);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(49);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(50);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(51);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(65);
  
  var _history2 = _interopRequireDefault(_history);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _Object$getPrototypeO;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Link)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _history2.default.push(_this.props.to);
          } else {
            _history2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      // eslint-disable-line react/prefer-stateless-function
  
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _history2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  exports.default = Link;

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 64 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(66);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(67);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(68);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var history = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                    *
                                                                                                                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                    *
                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                    */
  
  exports.default = history;

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(70);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(71);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _key = __webpack_require__(73);
  
  var _key2 = _interopRequireDefault(_key);
  
  var _dots = __webpack_require__(74);
  
  var _dots2 = _interopRequireDefault(_dots);
  
  var _logo = __webpack_require__(75);
  
  var _logo2 = _interopRequireDefault(_logo);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref2 = (0, _jsx3.default)('img', {
    src: _logo2.default,
    alt: 'TEDxAmsterdam'
  });
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return (0, _jsx3.default)('div', {
      className: (0, _classnames2.default)(_Navigation2.default.root, className),
      role: 'navigation'
    }, void 0, (0, _jsx3.default)(_Link2.default, {
      className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.login),
      to: '/chat'
    }, void 0, 'Login', (0, _jsx3.default)('img', {
      src: _key2.default,
      className: _Navigation2.default.icon
    }), 'Register'), (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.brand,
      to: '/'
    }, void 0, _ref2), (0, _jsx3.default)(_Link2.default, {
      className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.filter),
      to: ''
    }, void 0, (0, _jsx3.default)('img', {
      src: _dots2.default,
      className: _Navigation2.default.icon
    }), 'Filter Menu'));
  }
  
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(72);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, ".Kev6{margin:0;width:100%;position:relative}._1-rh,.Kev6{text-align:center}._1-rh{display:inline-block;text-decoration:none;font-size:1.125em}._1-rh,._1-rh:active,._1-rh:visited{color:rgba(0,0,0,.6)}._1-rh:hover{color:#000}.g6k6{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15);color:#fff}.g6k6:hover{background:rgba(0,0,0,.3)}._2KA9{color:hsla(0,0%,100%,.3)}._36Si{text-decoration:none;display:inline-block;position:relative;top:20px}._2SYg{float:left}._1B9i{float:right;position:relative;top:20px}._2woE{display:block;margin:0 auto}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Kev6",
  	"link": "_1-rh",
  	"highlight": "g6k6",
  	"spacer": "_2KA9",
  	"brand": "_36Si",
  	"login": "_2SYg",
  	"filter": "_1B9i",
  	"icon": "_2woE"
  };

/***/ },
/* 73 */
/***/ function(module, exports) {

  module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI1cHgiIGhlaWdodD0iMjVweCIgdmlld0JveD0iMCAwIDI1IDI1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IHNrZXRjaHRvb2wgMy44LjEgKDI5Njg3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT40MTc0RTM1Qy0zRDNGLTQ4OUEtODA0My05MEEyMjY1Q0U2NkY8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIHNrZXRjaHRvb2wuPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJtLlRvcGJhciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2LjAwMDAwMCwgLTI0LjAwMDAwMCkiIGZpbGw9IiMzMzMzMzMiPgogICAgICAgICAgICA8ZyBpZD0iVG9wYmFyLXdoaXRlIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWdpc3RlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguMDAwMDAwLCA5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJrZXkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCAxNS4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IlNoYXBlIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNi43MDEzMjgzLDAgQzEyLjUwOTI5NzksMCA5LjExMTE5NTQ1LDMuNDc3OTA0NzcgOS4xMTExOTU0NSw3Ljc2NjY0NzU0IEM5LjExMTE5NTQ1LDguNzY0NjYxNzUgOS4zMTUzNzAwMiw5LjcwOTA4NjEgOS42NTIzNzE5MiwxMC41ODUxNjM5IEwwLjQzMTExOTU0NSwyMC4wMjAwODc0IEMwLjE2NDcwNTg4MiwyMC4yOTM0NzM0IDAsMjAuNTUyODc5NCAwLDIwLjk2OTk0ODQgTDAsMjMuMjk5OTQyNiBDMCwyNC4xMzA5NzM5IDAuNzA1MTIzMzQsMjQuODUzMjcyMSAxLjUxODAyNjU3LDI0Ljg1MzI3MjEgTDMuNzk1MDY2NDEsMjQuODUzMjcyMSBDNC4yMDE4OTc1MywyNC44NTMyNzIxIDQuNDU5MjAzMDQsMjQuNjg2Mjg5MiA0LjcyNTYxNjcsMjQuNDE1MjMzMiBMNS44MTQ4MDA3NiwyMy4yOTk5NDI2IEw3LjU5MzE2ODg4LDIzLjI5OTk0MjYgQzguNDMxMTE5NTQsMjMuMjk5OTQyNiA5LjExMTE5NTQ1LDIyLjYwNDA1MSA5LjExMTE5NTQ1LDIxLjc0NjYxMzEgTDkuMTExMTk1NDUsMjAuMTkzMjgzNiBMMTAuNjI5MjIyLDIwLjE5MzI4MzYgQzExLjQ2NzE3MjcsMjAuMTkzMjgzNiAxMi4xNDcyNDg2LDE5LjQ5NzM5MiAxMi4xNDcyNDg2LDE4LjYzOTk1NDEgTDEyLjE0NzI0ODYsMTYuODE5NDUxOSBMMTMuOTQ1MzUxLDE0Ljk3Nzk3OTggQzE0LjgwMjI3NywxNS4zMjM1OTU2IDE1LjcyNDQ3ODIsMTUuNTMzMjk1MSAxNi43MDEzMjgzLDE1LjUzMzI5NTEgQzIwLjg5MTg0MDYsMTUuNTMzMjk1MSAyNC4yOTE0NjExLDEyLjA1NTM5MDMgMjQuMjkxNDYxMSw3Ljc2NjY0NzU0IEMyNC4yOTE0NjExLDMuNDc3OTA0NzcgMjAuODkxODQwNiwwIDE2LjcwMTMyODMsMCBMMTYuNzAxMzI4MywwIFogTTE2LjcwMTMyODMsMTMuOTc5OTY1NiBDMTUuNTc3OTg4NiwxMy45Nzk5NjU2IDE0LjUzNjYyMjQsMTMuNjQ1OTk5NyAxMy42MzQxNTU2LDEzLjEwMDc4MTEgTDEzLjM3MzA1NSwxMy4zNjcxNzcxIEwxMi41MTkxNjUxLDE0LjI0MDkyNDkgTDExLjA3MzI0NDgsMTUuNzIxMjQ4IEMxMC43ODg2MTQ4LDE2LjAxMjQ5NzIgMTAuNjI4NDYzLDE2LjQwNzA0MjkgMTAuNjI4NDYzLDE2LjgxOTQ1MTkgTDEwLjYyODQ2MywxOC42Mzk5NTQxIEw5LjExMDQzNjQzLDE4LjYzOTk1NDEgQzguMjcyNDg1NzcsMTguNjM5OTU0MSA3LjU5MjQwOTg3LDE5LjMzNTA2OTEgNy41OTI0MDk4NywyMC4xOTMyODM2IEw3LjU5MjQwOTg3LDIxLjc0NjYxMzEgTDUuODE0ODAwNzYsMjEuNzQ2NjEzMSBDNS40MTI1MjM3MiwyMS43NDY2MTMxIDUuMDI2MTg1OTYsMjEuOTEwNDg5NCA0Ljc0MTU1NTk4LDIyLjIwMTczODcgTDMuNjY1Mjc1MTQsMjMuMzAzMDQ5MyBMMS41MjAzMDM2MSwyMy4yOTk5NDI2IEwxLjUxODAyNjU3LDIxLjA4NjQ0ODEgTDEwLjM3MTkxNjUsMTIuMDQyOTYzNyBDMTAuMzcxOTE2NSwxMi4wNDI5NjM3IDEwLjM3MTkxNjUsMTIuMDQzNzQwMyAxMC4zNzI2NzU1LDEyLjA0NDUxNyBMMTEuNDg3NjY2LDEwLjkwMzU5NjUgQzEwLjk1NDgzODcsOS45ODAxNDIwOSAxMC42Mjg0NjMsOC45MTUzMzQ3MiAxMC42Mjg0NjMsNy43NjU4NzA4OCBDMTAuNjI4NDYzLDQuMzM0NTY1OTkgMTMuMzQ4MDA3NiwxLjU1MjU1Mjg0IDE2LjcwMDU2OTMsMS41NTI1NTI4NCBDMjAuMDUzMTMwOSwxLjU1MjU1Mjg0IDIyLjc3MjY3NTUsNC4zMzQ1NjU5OSAyMi43NzI2NzU1LDcuNzY1ODcwODggQzIyLjc3MjY3NTUsMTEuMTk3MTc1OCAyMC4wNTQ2NDksMTMuOTc5OTY1NiAxNi43MDEzMjgzLDEzLjk3OTk2NTYgTDE2LjcwMTMyODMsMTMuOTc5OTY1NiBaIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjEuMTE1NzQ5NSw2LjM5ODk0MDkxIEMyMC4yNjQ4OTU2LDUuMTg1NzkwNTcgMTkuMjI4ODQyNSw0LjEyNzE5NjUxIDE4LjAzNzk1MDcsMy4yNTAzNDIgQzE3Ljg0NDQwMjMsMy4xMDY2NTkwMiAxNy41OTM5Mjc5LDMuMDcwOTMyNDQgMTcuMzY4NTAwOSwzLjE1MTcwNTU3IEMxNi4zMTQyMzE1LDMuNTMxNDk0NjQgMTUuNTkyNDA5OSw0LjI2OTMyNjE2IDE1LjIyMzUyOTQsNS4zNDgxMTM1IEMxNS4xOTU0NDU5LDUuNDI4ODg2NjMgMTUuMTgxNzgzNyw1LjUxMjc2NjQzIDE1LjE4MTc4MzcsNS41OTU4Njk1NiBDMTUuMTgxNzgzNyw1Ljc1MDQyNTg0IDE1LjIyODg0MjUsNS45MDM0Mjg4IDE1LjMxOTkyNDEsNi4wMzMxMzE4MSBDMTYuMTczODE0LDcuMjQ3ODM1NDkgMTcuMjA4MzQ5MSw4LjMwNzIwNjIxIDE4LjM5NjIwNDksOS4xODA5NTQwNiBDMTguNTkwNTEyMyw5LjMyMzg2MDM4IDE4LjgzOTQ2ODcsOS4zNjAzNjM2MiAxOS4wNjQ4OTU2LDkuMjgwMzY3MTUgQzIwLjEyMDY4MzEsOC45MDI5MDgwOCAyMC44NDI1MDQ3LDguMTYzNTIzMjMgMjEuMjEyOTAzMiw3LjA4Mzk1OTIzIEMyMS4yNDA5ODY3LDcuMDAzMTg2MDkgMjEuMjU0NjQ5LDYuOTE5MzA2MyAyMS4yNTQ2NDksNi44MzYyMDMxNyBDMjEuMjUzODg5OSw2LjY4MTY0Njg4IDIxLjIwNjA3MjEsNi41Mjg2NDM5MyAyMS4xMTU3NDk1LDYuMzk4OTQwOTEgTDIxLjExNTc0OTUsNi4zOTg5NDA5MSBaIE0xOC44Mzg3MDk3LDguNTUxMDc4OTUgQzE3LjcxNjg4OCw3LjcyNTQ4NDMxIDE2Ljc0MDAzOCw2LjcyNTkxNjc3IDE1LjkzOTI3ODksNS42MDUxODk1MyBDMTYuMjMzMDE3MSw0Ljc0ODUyODMxIDE2Ljc4MjU0MjcsNC4xODYyMjMwMyAxNy41OTU0NDU5LDMuODgwMjE3MTEgQzE4LjcxODAyNjYsNC43MDczNjUwOCAxOS42OTMzNTg2LDUuNzA0NjAyNjIgMjAuNDkxODQwNiw2Ljg0MDA4NjQ5IEMyMC4xOTUwNjY0LDcuNjkwNTM0NCAxOS42NDcwNTg4LDguMjQ5NzMzMDIgMTguODM4NzA5Nyw4LjU1MTA3ODk1IEwxOC44Mzg3MDk3LDguNTUxMDc4OTUgWiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="

/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjM4cHgiIGhlaWdodD0iOHB4IiB2aWV3Qm94PSIwIDAgMzggOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBza2V0Y2h0b29sIDMuOC4xICgyOTY4NykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QjI0RUIxRjQtNjQ1QS00MjJELTk1Q0UtMjA0N0E0RkRCMjNGPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxyZWN0IGlkPSJwYXRoLTEiIHg9IjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0Ij48L3JlY3Q+CiAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgbWFza0NvbnRlbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIG1hc2tVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHg9IjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHJlY3QgaWQ9InBhdGgtMyIgeD0iMTAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0Ij48L3JlY3Q+CiAgICAgICAgPG1hc2sgaWQ9Im1hc2stNCIgbWFza0NvbnRlbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIG1hc2tVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHg9IjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0zIj48L3VzZT4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHJlY3QgaWQ9InBhdGgtNSIgeD0iMjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0Ij48L3JlY3Q+CiAgICAgICAgPG1hc2sgaWQ9Im1hc2stNiIgbWFza0NvbnRlbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIG1hc2tVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHg9IjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC01Ij48L3VzZT4KICAgICAgICA8L21hc2s+CiAgICAgICAgPHJlY3QgaWQ9InBhdGgtNyIgeD0iMzAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIHJ4PSI0Ij48L3JlY3Q+CiAgICAgICAgPG1hc2sgaWQ9Im1hc2stOCIgbWFza0NvbnRlbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIG1hc2tVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHg9IjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC03Ij48L3VzZT4KICAgICAgICA8L21hc2s+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Im0uVG9wYmFyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzA5LjAwMDAwMCwgLTIyLjAwMDAwMCkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlPSIjMEEwQjA5Ij4KICAgICAgICAgICAgPGcgaWQ9IlRvcGJhci13aGl0ZSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iTWVudSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAwLjAwMDAwMCwgMjIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Imljb25zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5LjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBpZD0iUmVjdGFuZ2xlLTg2IiBtYXNrPSJ1cmwoI21hc2stMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGlkPSJSZWN0YW5nbGUtODYiIG1hc2s9InVybCgjbWFzay00KSIgeGxpbms6aHJlZj0iI3BhdGgtMyI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgaWQ9IlJlY3RhbmdsZS04NiIgbWFzaz0idXJsKCNtYXNrLTYpIiB4bGluazpocmVmPSIjcGF0aC01Ij48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBpZD0iUmVjdGFuZ2xlLTg2IiBtYXNrPSJ1cmwoI21hc2stOCkiIHhsaW5rOmhyZWY9IiNwYXRoLTciPjwvdXNlPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "ae72e82da34f88bb6b8bc0277bbeaf9b.svg";

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(77);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return (0, _jsx3.default)('div', {
      className: _Feedback2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Feedback2.default.container
    }, void 0, (0, _jsx3.default)('a', {
      className: _Feedback2.default.link,
      href: 'https://gitter.im/kriasoft/react-starter-kit'
    }, void 0, 'Ask a question'), (0, _jsx3.default)('span', {
      className: _Feedback2.default.spacer
    }, void 0, '|'), (0, _jsx3.default)('a', {
      className: _Feedback2.default.link,
      href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
    }, void 0, 'Report an issue')));
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(_Feedback2.default)(Feedback);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(78);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "._2NP0{background:#f5f5f5;color:#333}._2AyN{margin:0 auto;padding:20px 8px;max-width:1000px;text-align:center;font-size:1.5em}._17M0,._17M0:active,._17M0:hover,._17M0:visited{color:#333;text-decoration:none}._17M0:hover{text-decoration:underline}._2n9Q{padding-right:15px;padding-left:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2NP0",
  	"container": "_2AyN",
  	"link": "_17M0",
  	"spacer": "_2n9Q"
  };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(80);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Footer() {
    return (0, _jsx3.default)('div', {
      className: _Footer2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Footer2.default.container
    }, void 0, (0, _jsx3.default)('span', {
      className: _Footer2.default.text
    }, void 0, '© Your Company'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '·'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/'
    }, void 0, 'Home'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '·'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/privacy'
    }, void 0, 'Privacy'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '·'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/not-found'
    }, void 0, 'Not Found')));
  }
  
  exports.default = (0, _withStyles2.default)(_Footer2.default)(Footer);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(81);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Jih{background:#333;color:#fff}.n1bV{margin:0 auto;padding:20px 15px;max-width:1000px;text-align:center}._2mr6{color:hsla(0,0%,100%,.5)}._3HO-,._9iT6{color:hsla(0,0%,100%,.3)}._1sUk,._2mr6{padding:2px 5px;font-size:1em}._1sUk,._1sUk:active,._1sUk:visited{color:hsla(0,0%,100%,.6);text-decoration:none}._1sUk:hover{color:#fff}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Jih",
  	"container": "n1bV",
  	"text": "_2mr6",
  	"textMuted": "_9iT6 _2mr6",
  	"spacer": "_3HO-",
  	"link": "_1sUk"
  };

/***/ },
/* 82 */
/***/ function(module, exports) {

  module.exports = require("react-redux");

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(3);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(84);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _fetch = __webpack_require__(40);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var resp, _ref, data;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                    query: '{news{title,link,contentSnippet}}'
                  }),
                  credentials: 'include'
                });
  
              case 2:
                resp = _context.sent;
                _context.next = 5;
                return resp.json();
  
              case 5:
                _ref = _context.sent;
                data = _ref.data;
  
                if (!(!data || !data.news)) {
                  _context.next = 9;
                  break;
                }
  
                throw new Error('Failed to load the news feed.');
  
              case 9:
                return _context.abrupt('return', (0, _jsx3.default)(_Home2.default, {
                  news: data.news
                }));
  
              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(70);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(85);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _tedx = __webpack_require__(88);
  
  var _tedx2 = _interopRequireDefault(_tedx);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'TEDDYxAmsterdam';
  
  var _ref2 = (0, _jsx3.default)('b', {}, void 0, '#');
  
  function Home(_ref, context) {
    var news = _ref.news;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Home2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Home2.default.container
    }, void 0, (0, _jsx3.default)('header', {
      className: _Home2.default.header
    }, void 0, (0, _jsx3.default)('h1', {
      className: _Home2.default.title
    }, void 0, _ref2, (0, _jsx3.default)('img', {
      className: _Home2.default.brand,
      src: _tedx2.default
    }), 'Ams'), (0, _jsx3.default)('span', {
      className: _Home2.default.year
    }, void 0, '2016')), (0, _jsx3.default)('section', {
      className: _Home2.default.power
    }, void 0, (0, _jsx3.default)('span', {
      className: _Home2.default.small
    }, void 0, 'new'), (0, _jsx3.default)('span', {
      className: _Home2.default.big
    }, void 0, 'POWER')), (0, _jsx3.default)(_Link2.default, {
      className: (0, _classnames2.default)(_Home2.default.link, _Home2.default.button),
      to: '/chat'
    }, void 0, (0, _jsx3.default)('h2', {
      className: _Home2.default.text
    }, void 0, 'Do you want to join us this year?'), (0, _jsx3.default)('span', {
      className: _Home2.default.text
    }, void 0, 'Click here to register for your ticket!!!'))));
  }
  
  Home.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(86);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "._2IMq{background:url(" + __webpack_require__(87) + ");background-size:cover;background-position:50%;background-color:#db352a;height:100%}._2Yej{padding:145px 10px 45px;margin:0 auto;max-width:1000px;text-align:center}._3s-c{display:block;border-radius:95px;background-color:#db352a;box-shadow:inset 0 -3px 0 0 rgba(0,0,0,.5);color:#fff;text-decoration:none;padding:25px 15px;font-size:.9em;box-sizing:border-box;position:fixed;bottom:15px;left:10px;right:10px}@media (min-width:600px){._3s-c{display:block;width:445px;position:relative;bottom:0;left:0;right:0}}._3rYP{position:relative;margin-bottom:30px;text-align:right;padding-right:120px}._1LoY{color:#fff;font-size:4em;font-family:Helvetica,Segoe UI,sans-serif;font-weight:400;line-height:normal;margin:0}._2zTv{margin:0 10px;height:50px;vertical-align:baseline}.GEmG{position:absolute;right:0;top:-40px;opacity:.2;color:#fff;font-size:7.5em;line-height:normal;font-family:HelveticaNeue-CondensedBlack}@media (max-width:500px){._3rYP{padding-right:70px}._1LoY{font-size:3em}._2zTv{height:35px}.GEmG{font-size:5em;top:-25px}}._2J9g{margin:0;text-shadow:2px 2px 7px rgba(0,0,0,.8)}._3AGa{color:#fff;font-family:HelveticaNeue-CondensedBlack;text-align:left;margin-bottom:40px}._1zBx,._3gWZ{display:block}._1zBx{font-size:100px;line-height:.9em}._3gWZ{font-size:150px;line-height:.8em}@media (max-width:470px){._1zBx{font-size:70px;line-height:.9em}._3gWZ{font-size:100px;line-height:.8em}}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2IMq",
  	"container": "_2Yej",
  	"button": "_3s-c",
  	"header": "_3rYP",
  	"title": "_1LoY",
  	"brand": "_2zTv",
  	"year": "GEmG",
  	"text": "_2J9g",
  	"power": "_3AGa",
  	"small": "_1zBx",
  	"big": "_3gWZ"
  };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "f0eff9649f2a793bbf1ce19a141a0a89.jpg";

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEwM3B4IiBoZWlnaHQ9IjMwcHgiIHZpZXdCb3g9IjAgMCAxMDMgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCAzLjguMyAoMjk4MDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPjFGQ0RFREIzLTE5MzEtNEQwNy1CNzVGLUMzNTM4OURCNjQ1RjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggc2tldGNodG9vbC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iT25ib2FyZGluZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Im0uSG9tZShMYW5kaW5nc3BhZ2UpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODAuMDAwMDAwLCAtMTAwLjAwMDAwMCkiIGZpbGw9IiNEQjM1MkEiPgogICAgICAgICAgICA8ZyBpZD0iI1RFRHhBbXMyMDE2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1Mi4wMDAwMDAsIDY0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlRFRHhBbXN0ZXJkYW1fbG9nby1Db3B5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyOC4wMDAwMDAsIDI1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJURUR4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMTEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iRmlsbC0zNSIgcG9pbnRzPSI5LjExMzgyNjgzIDguMDI3NTc2NiAwLjg1NzAyNTQ2NyA4LjAyNzU3NjYgMC44NTcwMjU0NjcgMC40NzI5ODA1MDEgMjYuNDM5NjMzMyAwLjQ3Mjk4MDUwMSAyNi40Mzk2MzMzIDguMDI3NTc2NiAxOC4xODU2MTYzIDguMDI3NTc2NiAxOC4xODU2MTYzIDI5Ljk0ODE4OTQgOS4xMTM4MjY4MyAyOS45NDgxODk0IDkuMTEzODI2ODMgOC4wMjc1NzY2Ij48L3BvbHlsaW5lPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IkZpbGwtMzYiIHBvaW50cz0iMjcuODQ5NjQzNSAwLjQ3Mjk4MDUwMSA1Mi42ODQwODgzIDAuNDcyOTgwNTAxIDUyLjY4NDA4ODMgOC4wMjc1NzY2IDM2LjkyNzI4MDEgOC4wMjc1NzY2IDM2LjkyNzI4MDEgMTEuNzAwNTU3MSA1Mi42ODQwODgzIDExLjcwMDU1NzEgNTIuNjg0MDg4MyAxOC43MjA2MTI4IDM2LjkyNzI4MDEgMTguNzIwNjEyOCAzNi45MjcyODAxIDIyLjM5Mzg3MTkgNTIuNjg4MjY0OSAyMi4zOTM4NzE5IDUyLjY4ODI2NDkgMjkuOTQ4MTg5NCAyNy44NDk2NDM1IDI5Ljk0ODE4OTQgMjcuODQ5NjQzNSAwLjQ3Mjk4MDUwMSI+PC9wb2x5bGluZT4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTYzLjI4ODk1NzYsMjIuMzkzODcxOSBMNjYuODM5MDQyNCwyMi4zOTM4NzE5IEM3Mi40OTM4NDA0LDIyLjM5Mzg3MTkgNzMuMzIwNTIyOSwxNy44MTAwMjc5IDczLjMyMDUyMjksMTUuMDQxMjI1NiBDNzMuMzIwNTIyOSwxMy4xODcxODY2IDcyLjczOTcwMTIsOC4wMjc1NzY2IDY2LjE3ODAzMDYsOC4wMjc1NzY2IEw2My4yODg5NTc2LDguMDI3NTc2NiBMNjMuMjg4OTU3NiwyMi4zOTM4NzE5IEw2My4yODg5NTc2LDIyLjM5Mzg3MTkgWiBNNTQuMjExODc3OCwwLjQ3Mjk4MDUwMSBMNjkuMTA4MzEyNCwwLjQ3Mjk4MDUwMSBDNzguOTI3NzA4LDAuNDcyOTgwNTAxIDgyLjM5ODE1OTYsNy43Mzg3MTg2NiA4Mi4zOTgxNTk2LDE1LjE2NzEzMDkgQzgyLjM5ODE1OTYsMjQuMjEwNTg1IDc3LjYxMTI1MywyOS45NDgxODk0IDY3LjMzNTc3NTksMjkuOTQ4MTg5NCBMNTQuMjExODc3OCwyOS45NDgxODk0IEw1NC4yMTE4Nzc4LDAuNDcyOTgwNTAxIEw1NC4yMTE4Nzc4LDAuNDcyOTgwNTAxIFoiIGlkPSJGaWxsLTM3Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iRmlsbC0zOCIgcG9pbnRzPSI5NS40NDE1ODkxIDE4LjU4OTY5MzYgOTIuNjcyNTIyOSAxMy45OTU4MjE3IDg5Ljk3MjIzMDkgMTguNTg5NjkzNiA4My4zMjExODE3IDE4LjU4OTY5MzYgODkuNjM1MzIwOSA5LjMwMTExNDIxIDgzLjU1NTM0OCAwLjQxNjE1NTk4OSA5MC4yMDg2MjQ4IDAuNDE2MTU1OTg5IDkyLjY3MjUyMjkgNC44MDgwNzc5OSA5NS4yMDcxNDQzIDAuNDE2MTU1OTg5IDEwMS44NTg0NzIgMC40MTYxNTU5ODkgOTUuNzgwNDQ4MiA5LjMwMTExNDIxIDEwMi4wOTQzMDkgMTguNTg5NjkzNiA5NS40NDE1ODkxIDE4LjU4OTY5MzYiPjwvcG9seWxpbmU+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Chat = __webpack_require__(90);
  
  var _Chat2 = _interopRequireDefault(_Chat);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_Chat2.default, {});
  
  exports.default = {
  
    path: '/chat',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Chat = __webpack_require__(91);
  
  var _Chat2 = _interopRequireDefault(_Chat);
  
  var _reactRedux = __webpack_require__(82);
  
  var _redux = __webpack_require__(93);
  
  var _Messenger = __webpack_require__(94);
  
  var _Messenger2 = _interopRequireDefault(_Messenger);
  
  var _messenger = __webpack_require__(100);
  
  var _messenger2 = _interopRequireDefault(_messenger);
  
  var _messenger3 = __webpack_require__(97);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var store = (0, _redux.createStore)(_messenger2.default);
  
  var title = 'TEDDYxAmsterdam';
  
  /*const Wit = require('node-wit').Wit;
  const actions = {
    say(sessionId, context, message, cb) {
      console.log(message);
      cb();
    },
    merge(sessionId, context, entities, message, cb) {
      cb(context);
    },
    error(sessionId, context, error) {
      console.log(error.message);
    },
  };
  const client = new Wit('KJN5XTUXGTW27DC7VJ4Y64QX6N7BZXA5', actions);
  const context = {};
  
  client.message('Hi my name is Dave', context, (error, data) => {
    if (error) {
      console.log('Oops! Got an error: ' + error);
    } else {
  		store.dispatch(sendMsg({
  			  user: {
  	        avatar: '//pi.tedcdn.com/r/pe.tedcdn.com/images/ted/c9928d59974a7d5b8f8889794634cbded07ff266_1600x1200.jpg?c=1050%2C550&w=180',
  	        className: s.them
  	      },
  	      text: JSON.stringify(data),
  	      time: new Date().getTime()
  		}));
  
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    }
  });
  
  //	store.subscribe(() => { console.log('state', store.getState()) });
  */
  
  var _ref = (0, _jsx3.default)(_Messenger2.default, {});
  
  function Chat(props, context) {
    context.setTitle(title);
    return _ref;
  }
  
  Chat.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  
  var mapState = function mapState(state) {
    return {
      messenger: state.messenger
    };
  };
  
  var mapDispatch = {
    sendMsg: _messenger3.sendMsg,
    updateMsger: _messenger3.updateMsger
  };
  
  exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)((0, _withStyles2.default)(_Chat2.default)(Chat));

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(92);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Qps{padding-left:20px;padding-right:20px}._1ptS{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Qps",
  	"container": "_1ptS"
  };

/***/ },
/* 93 */
/***/ function(module, exports) {

  module.exports = require("redux");

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
  		value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(47);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(48);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(49);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(50);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(51);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Messenger = __webpack_require__(95);
  
  var _Messenger2 = _interopRequireDefault(_Messenger);
  
  var _reactRedux = __webpack_require__(82);
  
  var _messenger = __webpack_require__(97);
  
  var _isomorphicFetch = __webpack_require__(99);
  
  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var cx = __webpack_require__(70);
  
  var Messenger = function (_Component) {
  		(0, _inherits3.default)(Messenger, _Component);
  
  		function Messenger() {
  				(0, _classCallCheck3.default)(this, Messenger);
  				return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Messenger).apply(this, arguments));
  		}
  
  		(0, _createClass3.default)(Messenger, [{
  				key: 'chatWithBot',
  				value: function chatWithBot(props) {
  						(0, _isomorphicFetch2.default)('/api/bot?message=' + props.messenger.input).then(function (response) {
  								return response.json();
  						}).then(function (data) {
  								if (data.text) {
  										console.log(data, 'from chatbot');
  										var update = {
  												user: {
  														avatar: '//pi.tedcdn.com/r/pe.tedcdn.com/images/ted/c9928d59974a7d5b8f8889794634cbded07ff266_1600x1200.jpg?c=1050%2C550&w=180',
  														className: _Messenger2.default.them
  												},
  												text: data.text,
  												time: new Date().getTime()
  										};
  										props.sendMsg(update);
  								}
  						});
  						return props.messenger.input;
  				}
  		}, {
  				key: 'componentDidMount',
  				value: function componentDidMount() {}
  		}, {
  				key: 'render',
  				value: function render() {
  						var _this2 = this;
  
  						return (0, _jsx3.default)('div', {
  								className: _Messenger2.default.wrapper
  						}, void 0, (0, _jsx3.default)('nav', {
  								id: 'nav',
  								className: _Messenger2.default.nav
  						}, void 0, (0, _jsx3.default)('div', {
  								className: _Messenger2.default.defaultNav
  						}, void 0, (0, _jsx3.default)('div', {
  								className: _Messenger2.default.mainNav
  						}, void 0, (0, _jsx3.default)('div', {
  								className: _Messenger2.default.toggle
  						}, void 0), (0, _jsx3.default)('div', {
  								className: _Messenger2.default.mainNavItem
  						}, void 0, (0, _jsx3.default)('a', {
  								className: _Messenger2.default.mainNavItemLink
  						}, void 0, 'Chat')), (0, _jsx3.default)('div', {
  								className: _Messenger2.default.options
  						}, void 0)))), (0, _jsx3.default)('div', {
  								className: _Messenger2.default.inner
  						}, void 0, (0, _jsx3.default)('div', {
  								className: _Messenger2.default.content
  						}, void 0, this.props.messenger.messageList.map(function (item, index) {
  								return (0, _jsx3.default)('div', {
  										className: cx(_Messenger2.default.messageWrapper, item.user.className)
  								}, index, (0, _jsx3.default)('div', {
  										className: cx(_Messenger2.default.circleWrapper, "animated bounceIn"),
  										style: { backgroundImage: 'url("' + item.user.avatar + '")', backgroundPosition: '-70px -285px' }
  								}), (0, _jsx3.default)('div', {
  										className: _Messenger2.default.textWrapper
  								}, void 0, item.text));
  						}))), (0, _jsx3.default)('div', {
  								className: _Messenger2.default.bottom
  						}, void 0, (0, _jsx3.default)('textarea', {
  								className: _Messenger2.default.input,
  								onChange: function onChange(e) {
  										_this2.props.updateMsger(e.target.value);
  										e.preventDefault();
  								}
  						}), (0, _jsx3.default)('div', {
  								className: _Messenger2.default.send,
  								onClick: function onClick(e) {
  										_this2.props.sendMsg({
  												user: {
  														avatar: '',
  														className: _Messenger2.default.me
  												},
  												text: _this2.chatWithBot(_this2.props),
  												time: new Date().getTime()
  										});
  										e.preventDefault();
  								}
  						})));
  				}
  		}]);
  		return Messenger;
  }(_react.Component);
  
  var mapState = function mapState(state) {
  		return {
  				messenger: state.messenger
  		};
  };
  
  var mapDispatch = {
  		sendMsg: _messenger.sendMsg,
  		updateMsger: _messenger.updateMsger
  };
  
  exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)((0, _withStyles2.default)(_Messenger2.default)(Messenger));

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(96);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "*{box-sizing:border-box}body{background-color:#ff5722}.iXTn{color:#fff;text-align:center;font-weight:100}.nRKI{height:520px;width:320px;overflow:hidden;background-color:#fff;position:fixed;top:100px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);box-shadow:0 3px 3px 0 rgba(50,50,50,.5);-webkit-transition:.3s ease;transition:.3s ease}.nRKI ._1flk{overflow:scroll;height:520px;padding-top:64px;background:#f2f2f2;-ms-overflow-style:none;overflow:-moz-scrollbars-none}.nRKI ._1flk::-webkit-scrollbar{width:0!important}.nRKI ._1flk ._2t8e{padding:10.66667px;position:relative;margin-bottom:32px}._1mGK{position:fixed;top:0;left:0;right:0;height:64px;z-index:100;-webkit-transition:.3s ease;transition:.3s ease}._1mGK ._3XWU{z-index:110;background-color:#f44336;border-bottom:3px solid #ea1c0d;color:#fff;box-shadow:0 3px 3px 0 rgba(50,50,50,.1)}._1mGK ._3XWU,._1mGK ._3XWU ._2m7q{height:64px;width:100%;position:absolute;left:0;top:0;-webkit-transition:.3s ease;transition:.3s ease}._1mGK ._3XWU ._2m7q{margin:0;padding:0;list-style:none}._1mGK ._3XWU ._2m7q ._2-RL{height:32px;width:32px;background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/104946/ic_arrow_back_white_48dp.png);background-size:contain;margin:16px;float:left}._1mGK ._3XWU ._2m7q ._2-RL:hover{cursor:pointer}._1mGK ._3XWU ._2m7q ._1pBL{height:32px;width:32px;background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/104946/ic_more_vert_white_48dp.png);background-size:contain;margin:16px;position:absolute;right:0}._1mGK ._3XWU ._2m7q ._1pBL:hover{cursor:pointer}._1mGK ._3XWU ._2m7q ._1S-U{float:left;margin-right:50px}._1mGK ._3XWU ._2m7q ._1S-U,._1mGK ._3XWU ._2m7q ._1S-U .vPms{height:64px;position:relative;line-height:64px;-webkit-transition:.3s ease;transition:.3s ease}._1mGK ._3XWU ._2m7q ._1S-U .vPms{display:block;width:100%;text-align:center;text-decoration:none;color:inherit}.WmIo{position:fixed;bottom:0;right:0}.WmIo,.WmIo ._3VXN{left:0;height:64px;background:#fff}.WmIo ._3VXN{border:none;width:calc(100% - 64px);position:absolute;top:0;padding:0 5%;resize:none;overflow:scroll;padding-top:24px;font-weight:300;-ms-overflow-style:none;overflow:-moz-scrollbars-none}.WmIo ._3VXN:focus{outline:none}.WmIo ._3VXN::-webkit-scrollbar{width:0!important}.WmIo ._3PT5{position:fixed;height:42.66667px;width:42.66667px;border-radius:50%;border:0;background:#f44336;color:#fff;bottom:10.66667px;right:10.66667px}.WmIo ._3PT5:before{content:'';background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/104946/ic_send_white_48dp.png) no-repeat 50%;background-size:25.6px;position:absolute;top:0;left:0;right:0;bottom:0}.WmIo ._3PT5:focus{outline:none}.WmIo ._3PT5:hover{cursor:pointer}._1g7K{position:relative;overflow:hidden;width:100%;margin:10.66667px 0;padding:10.66667px 0}._1g7K .N7FI{height:42.66667px;width:42.66667px;border-radius:50%}._1g7K ._3-j3{padding:10.66667px;min-height:42.66667px;width:60%;margin:0 10.66667px;box-shadow:0 1px 0 0 rgba(50,50,50,.3);border-radius:2px;font-weight:300;position:relative}._1g7K ._3-j3:before{content:'';width:0;height:0;border-style:solid}._1g7K._2jjM ._3-j3,._1g7K._2jjM .N7FI{background:#f44336;float:left;color:#fff}._1g7K._2jjM ._3-j3:before{border-width:0 10px 10px 0;border-color:transparent #f44336 transparent transparent;position:absolute;top:0;left:-9px}._1g7K._20bL ._3-j3,._1g7K._20bL .N7FI{background:#ff5722;float:right;color:#333}._1g7K._20bL ._3-j3{background:#fff}._1g7K._20bL ._3-j3:before{border-width:10px 10px 0 0;border-color:#fff transparent transparent;position:absolute;top:0;right:-9px}@media (max-width:560px){.nRKI{width:100%;top:0;left:0;-webkit-transform:translateX(0);transform:translateX(0)}.nRKI,.nRKI ._1flk{height:100%;height:100vh}}", ""]);
  
  // exports
  exports.locals = {
  	"title": "iXTn",
  	"wrapper": "nRKI",
  	"inner": "_1flk",
  	"content": "_2t8e",
  	"nav": "_1mGK",
  	"defaultNav": "_3XWU",
  	"mainNav": "_2m7q",
  	"toggle": "_2-RL",
  	"options": "_1pBL",
  	"mainNavItem": "_1S-U",
  	"mainNavItemLink": "vPms",
  	"bottom": "WmIo",
  	"input": "_3VXN",
  	"send": "_3PT5",
  	"messageWrapper": "_1g7K",
  	"circleWrapper": "N7FI",
  	"textWrapper": "_3-j3",
  	"them": "_2jjM",
  	"me": "_20bL"
  };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.updateMsger = updateMsger;
  exports.sendMsg = sendMsg;
  
  var _constants = __webpack_require__(98);
  
  var ActionTypes = _interopRequireWildcard(_constants);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function updateMsger(message) {
    return {
      type: ActionTypes.MESSENGER_UPDATE,
      payload: {
        message: message
      }
    };
  }
  
  function sendMsg(message) {
    return {
      type: ActionTypes.MESSENGER_SEND,
      payload: {
        message: message
      }
    };
  }

/***/ },
/* 98 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var SET_RUNTIME_VARIABLE = exports.SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
  var MESSENGER_SEND = exports.MESSENGER_SEND = 'MESSENGER_SEND';
  var MESSENGER_UPDATE = exports.MESSENGER_UPDATE = 'MESSENGER_UPDATE';

/***/ },
/* 99 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-fetch");

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(63);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  exports.default = messenger;
  
  var _constants = __webpack_require__(98);
  
  var ActionTypes = _interopRequireWildcard(_constants);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var defaultState = {
    messageList: [],
    input: ''
  };
  
  function messenger() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case ActionTypes.MESSENGER_UPDATE:
        return (0, _extends3.default)({}, state, {
          input: action.payload.message
        });
      case ActionTypes.MESSENGER_SEND:
        state.messageList.push(action.payload.message);
        return (0, _extends3.default)({}, state);
      default:
        return state;
    }
  }

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(102);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_Contact2.default, {});
  
  exports.default = {
  
    path: '/contact',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(103);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Contact Us'; /**
                             * React Starter Kit (https://www.reactstarterkit.com/)
                             *
                             * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                             *
                             * This source code is licensed under the MIT license found in the
                             * LICENSE.txt file in the root directory of this source tree.
                             */
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '...');
  
  function Contact(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Contact2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Contact2.default.container
    }, void 0, _ref, _ref2));
  }
  
  Contact.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Contact2.default)(Contact);

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(104);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "._1G9o{padding-left:20px;padding-right:20px}._2TnC{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1G9o",
  	"container": "_2TnC"
  };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(106);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_Login2.default, {});
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(107);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Log In'; /**
                         * React Starter Kit (https://www.reactstarterkit.com/)
                         *
                         * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                         *
                         * This source code is licensed under the MIT license found in the
                         * LICENSE.txt file in the root directory of this source tree.
                         */
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref2 = (0, _jsx3.default)('path', {
    d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
  });
  
  var _ref3 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Facebook');
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Google');
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Twitter');
  
  function Login(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Login2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Login2.default.container
    }, void 0, _ref, (0, _jsx3.default)('p', {
      className: _Login2.default.lead
    }, void 0, 'Log in with your username or company email address.'), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.facebook,
      href: '/login/facebook'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '30',
      height: '30',
      viewBox: '0 0 30 30',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, _ref2), _ref3)), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.google,
      href: '/login/google'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '30',
      height: '30',
      viewBox: '0 0 30 30',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, (0, _jsx3.default)('path', {
      d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
    })), _ref4)), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.twitter,
      href: '/login/twitter'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '30',
      height: '30',
      viewBox: '0 0 30 30',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, (0, _jsx3.default)('path', {
      d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
    })), _ref5)), (0, _jsx3.default)('strong', {
      className: _Login2.default.lineThrough
    }, void 0, 'OR'), (0, _jsx3.default)('form', {
      method: 'post'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Login2.default.label,
      htmlFor: 'usernameOrEmail'
    }, void 0, 'Username or email address:'), (0, _jsx3.default)('input', {
      className: _Login2.default.input,
      id: 'usernameOrEmail',
      type: 'text',
      name: 'usernameOrEmail',
      autoFocus: true
    })), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Login2.default.label,
      htmlFor: 'password'
    }, void 0, 'Password:'), (0, _jsx3.default)('input', {
      className: _Login2.default.input,
      id: 'password',
      type: 'password',
      name: 'password'
    })), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Login2.default.button,
      type: 'submit'
    }, void 0, 'Log in')))));
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(108);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, ".rQNQ{padding-left:20px;padding-right:20px}._2BVu{margin:0 auto;padding:0 0 40px;max-width:380px}._1mJB{font-size:1.25em}._25Ti{margin-bottom:15px}._2G0a{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._1bTr{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:0;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._1bTr:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._11e1{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._11e1:hover{background:rgba(54,50,119,.8)}._11e1:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._2nZ7{border-color:#3b5998;background:#3b5998}._2nZ7:hover{background:#2d4373}._23Hc{border-color:#dd4b39;background:#dd4b39}._23Hc:hover{background:#c23321}.AJde{border-color:#55acee;background:#55acee}.AJde:hover{background:#2795e9}._34kk{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}.UpbG{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}.UpbG:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}.UpbG:after,.UpbG:before{position:absolute;content:''}.UpbG:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "rQNQ",
  	"container": "_2BVu",
  	"lead": "_1mJB",
  	"formGroup": "_25Ti",
  	"label": "_2G0a",
  	"input": "_1bTr",
  	"button": "_11e1",
  	"facebook": "_2nZ7 _11e1",
  	"google": "_23Hc _11e1",
  	"twitter": "AJde _11e1",
  	"icon": "_34kk",
  	"lineThrough": "UpbG"
  };

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(110);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_Register2.default, {});
  
  exports.default = {
  
    path: '/register',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(111);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New User Registration'; /**
                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                        *
                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                        *
                                        * This source code is licensed under the MIT license found in the
                                        * LICENSE.txt file in the root directory of this source tree.
                                        */
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '...');
  
  function Register(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Register2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Register2.default.container
    }, void 0, _ref, _ref2));
  }
  
  Register.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Register2.default)(Register);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(112);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "._1hu0{padding-left:20px;padding-right:20px}.OjhI{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1hu0",
  	"container": "OjhI"
  };

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(3);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Content = __webpack_require__(114);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  var _fetch = __webpack_require__(40);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '*',
  
    action: function action(_ref) {
      var _this = this;
  
      var path = _ref.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var resp, _ref2, data;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                    query: '{content(path:"' + path + '"){path,title,content,component}}'
                  }),
                  credentials: 'include'
                });
  
              case 2:
                resp = _context.sent;
  
                if (!(resp.status !== 200)) {
                  _context.next = 5;
                  break;
                }
  
                throw new Error(resp.statusText);
  
              case 5:
                _context.next = 7;
                return resp.json();
  
              case 7:
                _ref2 = _context.sent;
                data = _ref2.data;
  
                if (!(!data || !data.content)) {
                  _context.next = 11;
                  break;
                }
  
                return _context.abrupt('return', undefined);
  
              case 11:
                return _context.abrupt('return', _react2.default.createElement(_Content2.default, data.content));
  
              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(47);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(48);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(49);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(50);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(51);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Content = __webpack_require__(115);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Content = function (_Component) {
    (0, _inherits3.default)(Content, _Component);
  
    function Content() {
      (0, _classCallCheck3.default)(this, Content);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Content).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Content, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.setTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: _Content2.default.root
        }, void 0, (0, _jsx3.default)('div', {
          className: _Content2.default.container
        }, void 0, this.props.path === '/' ? null : (0, _jsx3.default)('h1', {}, void 0, this.props.title), (0, _jsx3.default)('div', {
          dangerouslySetInnerHTML: { __html: this.props.content || '' }
        })));
      }
    }]);
    return Content;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  Content.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(_Content2.default)(Content);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(116);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, ".aWU5{padding-left:20px;padding-right:20px}._2OJN{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "aWU5",
  	"container": "_2OJN"
  };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(46);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(118);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render;
      var context = _ref.context;
      var error = _ref.error;
  
      return render((0, _jsx3.default)(_App2.default, {
        context: context,
        error: error
      }, void 0, (0, _jsx3.default)(_ErrorPage2.default, {
        error: error
      })), error.status || 500);
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(44);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(45);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(119);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = 'Error';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (false) {
      errorMessage = (0, _jsx3.default)('pre', {}, void 0, error.stack);
    }
  
    context.setTitle(title);
  
    return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h1', {}, void 0, title), (0, _jsx3.default)('p', {}, void 0, content), errorMessage);
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(120);
      var insertCss = __webpack_require__(56);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(55)();
  // imports
  
  
  // module
  exports.push([module.id, "*{line-height:1.2;margin:0}html{color:#888;display:table;font-family:sans-serif;height:100%;text-align:center;width:100%}body{display:table-cell;vertical-align:middle;margin:2em auto}h1{color:#555;font-size:2em;font-weight:400}p{margin:0 auto;width:280px}pre{text-align:left;margin-top:32px;margin-top:2rem}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 121 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(3);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  exports.default = configureStore;
  
  var _redux = __webpack_require__(93);
  
  var _reduxThunk = __webpack_require__(123);
  
  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
  
  var _reducers = __webpack_require__(124);
  
  var _reducers2 = _interopRequireDefault(_reducers);
  
  var _createHelpers = __webpack_require__(127);
  
  var _createHelpers2 = _interopRequireDefault(_createHelpers);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function configureStore(initialState, helpersConfig) {
    var helpers = (0, _createHelpers2.default)(helpersConfig);
    var middleware = [_reduxThunk2.default.withExtraArgument(helpers)];
  
    var enhancer = void 0;
  
    if (false) {
      if (process.env.BROWSER) {
        var createLogger = require('redux-logger');
        middleware.push(createLogger({
          collapsed: true
        }));
      } else {
        // Server side redux action logger
        middleware.push(function (store) {
          return function (next) {
            return function (action) {
              // eslint-disable-line no-unused-vars
              var payload = (0, _stringify2.default)(action.payload);
              console.log(' * ' + action.type + ': ' + payload); // eslint-disable-line no-console
              return next(action);
            };
          };
        });
      }
  
      // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
      var devToolsExtension = function devToolsExtension(f) {
        return f;
      };
      if (process.env.BROWSER && window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension();
      }
  
      enhancer = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), devToolsExtension);
    } else {
      enhancer = _redux.applyMiddleware.apply(undefined, middleware);
    }
  
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    var store = (0, _redux.createStore)(_reducers2.default, initialState, enhancer);
  
    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (false) {
      module.hot.accept('../reducers', function () {
        return store.replaceReducer(require('../reducers').default);
      });
    }
  
    return store;
  }

/***/ },
/* 123 */
/***/ function(module, exports) {

  module.exports = require("redux-thunk");

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _redux = __webpack_require__(93);
  
  var _runtime = __webpack_require__(125);
  
  var _runtime2 = _interopRequireDefault(_runtime);
  
  var _messenger = __webpack_require__(100);
  
  var _messenger2 = _interopRequireDefault(_messenger);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = (0, _redux.combineReducers)({
    runtime: _runtime2.default,
    messenger: _messenger2.default
  });

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _defineProperty2 = __webpack_require__(126);
  
  var _defineProperty3 = _interopRequireDefault(_defineProperty2);
  
  var _extends3 = __webpack_require__(63);
  
  var _extends4 = _interopRequireDefault(_extends3);
  
  exports.default = runtime;
  
  var _constants = __webpack_require__(98);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function runtime() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];
  
    switch (action.type) {
      case _constants.SET_RUNTIME_VARIABLE:
        return (0, _extends4.default)({}, state, (0, _defineProperty3.default)({}, action.payload.name, action.payload.value));
      default:
        return state;
    }
  }

/***/ },
/* 126 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(63);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(3);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  exports.default = createHelpers;
  
  var _fetch = __webpack_require__(40);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function createGraphqlRequest(fetchKnowingCookie) {
    return function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(query, variables) {
        var fetchConfig, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetchConfig = {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({ query: query, variables: variables }),
                  credentials: 'include'
                };
                _context.next = 3;
                return fetchKnowingCookie('/graphql', fetchConfig);
  
              case 3:
                resp = _context.sent;
  
                if (!(resp.status !== 200)) {
                  _context.next = 6;
                  break;
                }
  
                throw new Error(resp.statusText);
  
              case 6:
                _context.next = 8;
                return resp.json();
  
              case 8:
                return _context.abrupt('return', _context.sent);
  
              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
  
      function graphqlRequest(_x, _x2) {
        return ref.apply(this, arguments);
      }
  
      return graphqlRequest;
    }();
  }
  
  function createFetchKnowingCookie(_ref) {
    var cookie = _ref.cookie;
  
    if (true) {
      return function (url) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
        var isLocalUrl = /^\/($|[^\/])/.test(url);
  
        // pass cookie only for itself.
        // We can't know cookies for other sites BTW
        if (isLocalUrl && options.credentials === 'include') {
          var headers = (0, _extends3.default)({}, options.headers, {
            cookie: cookie
          });
          return (0, _fetch2.default)(url, (0, _extends3.default)({}, options, { headers: headers }));
        }
  
        return (0, _fetch2.default)(url, options);
      };
    }
  
    return _fetch2.default;
  }
  
  function createHelpers(config) {
    var fetchKnowingCookie = createFetchKnowingCookie(config);
    var graphqlRequest = createGraphqlRequest(fetchKnowingCookie);
  
    return {
      fetch: fetchKnowingCookie,
      graphqlRequest: graphqlRequest
    };
  }

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setRuntimeVariable = setRuntimeVariable;
  
  var _constants = __webpack_require__(98);
  
  function setRuntimeVariable(_ref) {
    var name = _ref.name;
    var value = _ref.value;
  
    return {
      type: _constants.SET_RUNTIME_VARIABLE,
      payload: {
        name: name,
        value: value
      }
    };
  }

/***/ },
/* 129 */
/***/ function(module, exports) {

  module.exports = require("node-wit");

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(131);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, state, title, trackingId) {
  buf.push("<!DOCTYPE html><html lang=\"\" class=\"no-js\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title><meta name=\"description\"" + (jade.attr("description", description, true, true)) + "><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\"><link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\"><link rel=\"stylesheet\" href=\"//s3-us-west-2.amazonaws.com/s.cdpn.io/104946/animate.min.css\"><style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp) + "</style></head><body><div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp) + "</div><script id=\"source\"" + (jade.attr("src", entry, true, true)) + (jade.attr("data-initial-state", state, true, true)) + "></script><script>window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\nga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')</script>");
  if ( trackingId)
  {
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer></script>");
  }
  buf.push("</body></html>");}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"state" in locals_for_with?locals_for_with.state:typeof state!=="undefined"?state:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  }

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(33).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(131);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  buf.push("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Internal Server Error</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\"><style>* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  margin: 2em auto;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n</style></head><body><h1>Internal Server Error</h1><p>Sorry, something went wrong.</p><pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)) + "</pre></body></html><!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  }

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map