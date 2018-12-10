#!/usr/bin/env node
const connect = require('connect');
const serveStatic = require('serve-static');
const config = require('./config.json');

const useCdn = process.env.USE_CROSSORIGIN_CDN === '1';

const startServers = async () => {
  console.log('Serving files from http://localhost:8080');
  connect().use(serveStatic(config.publicDir)).listen(8080);

  if (useCdn) {
    console.log(`Serving files from http://localhost:8081`);
    connect().use(serveStatic(config.publicDir, {
      setHeaders: (response, path) => {
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      },
    })).listen(8081);
  }
};

if (require.main === module) {
  startServers();
} else {
  module.exports = startServers;
}
