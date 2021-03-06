// Karma configuration
// Generated on Fri Jan 20 2017 15:39:23 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '/' + __dirname + '/',
    hostname: process.env.IP,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'js/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/requirejs/require.js',
      'js/gameapp.js',
      'js/gameSearchComponent.js',
      'js/recentReleases.js',
      'js/releaseComponent.js',
      {pattern: "spec/searchComponentSpec.js", included: false},
      {pattern: "spec/recentReleaseSpec.js", included: false},
      

      'test-main.js'
    ],


    // list of files to exclude
    exclude: [
      "steamList.json"
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    
    
    // web server port
    port: process.env.PORT,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
