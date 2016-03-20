'use strict';

const opts = {
  base: {
    alias: 'b',
    default: './topics',
    describe: 'The base directory for presentation topics',
    type: 'string'
  },
  topic: {
    alias: 't',
    default: '',
    describe: 'The name of the topic being worked with',
    type: 'string'
  },
  port: {
    alias: 'p',
    default: 8000,
    describe: 'The port on which the server should be run',
    type: 'number'
  }
}

const argv = require('yargs').options(opts).argv;

module.exports = {
  base: argv.base,
  topic: argv.topic,
  port: argv.port,

  src: {
    assets: './assets',
    css: './src/css',
    js: './src/js',
    topic: argv.topic === '' ? argv.base : `${argv.base}/${argv.topic}`
  },

  build: {
    root: './build',
    assets: './build',
    css: './build/css',
    js: './build/js',
    topic: argv.topic === '' ? './build/topics' : `./build/topics/${argv.topic}`
  },

  stylus: {
    compress: false,
    linenos: false
  },

  lsc: {},

  jade: {
    pretty: true,
    compileDebug: false,
    doctype: 'html'
  }
};
