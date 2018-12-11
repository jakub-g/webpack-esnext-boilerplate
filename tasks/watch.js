const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const compile = require('./compile');
const server = require('./server');

(async () => {
  await compile();

  console.log('Watching source files for changes...');
  chokidar
      .watch('app/**/*', {ignoreInitial: true})
      .on('all', debounce(compile, 100));

  server();
})();
