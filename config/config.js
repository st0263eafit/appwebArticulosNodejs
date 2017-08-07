var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/articulosem-development'
  },

  test: {
    baseUrl: "/nodeArticulos/",
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 4000,
    db: 'mongodb://localhost/articulosem-test'
  },

  production: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'articulos'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://emontoya:Amoeba67.@ds163397.mlab.com:63397/emontoya'
  }
};

module.exports = config[env];
