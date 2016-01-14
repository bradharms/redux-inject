module.exports = function(config) {
  var files = process.cwd() + '/spec/**/*.js';
  var preprocessors = {};
  preprocessors[files] = 'browserify';

  config.set({
    files: [files],
    browsers: ['PhantomJS'],
    frameworks: ['browserify', 'jasmine'],
    preprocessors: preprocessors,
    singleRun: true,
  });
};
