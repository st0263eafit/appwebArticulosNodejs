var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/articulos-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/articulos-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/articulos-production'
  }
};

module.exports = config[env];
