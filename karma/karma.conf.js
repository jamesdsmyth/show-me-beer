// Karma Test Runner configuration
const webpackConfig = require('../webpack/dev.conf.js');

module.exports = config => {
  config.set({
    // Expand this if you want to test in Chrome etc
    browsers: ['PhantomJS'],

    // Run test using Jasmine and format the output with Mocha
    frameworks: ['jasmine'],

    // Use the commented out line to enable coverage reporting
    // reporters: ['mocha', 'coverage'],
    reporters: ['mocha'],

    // IF the env variable "CONTINUOUS_INTEGRATION" is set then don't enter the watch mode
    singleRun: !!process.env.CONTINUOUS_INTEGRATION,

    // List of files to load in the test browser
    files: ['./karma.webpack.tests.js'],

    // Preprocessor for the files to be run
    preprocessors: {
      // Must be passed through webpack to convert the ES6 down
      './karma.webpack.tests.js': ['webpack', 'sourcemap']
    },

    // Extend our existing webpack config with changes specific to running tests
    webpack: Object.assign({}, webpackConfig,
      {
        // Overriding the entry point to remove all the hot-reloading items
        entry: './src/client/client.js',

        // Add a loader for reporting code coverage
        module: Object.assign({}, webpackConfig.module, {
          postLoaders: [
            {
              test: /\.js$/,
              loader: 'istanbul-instrumenter',
              exclude: /(node_modules|karma|spec)/,
              query: {
                esModules: true
              }
            }
          ]
        }),

        // Enzyme specific config:
        devtool: 'inline-source-map',
        externals: {
          cheerio: 'window',
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true
        }
      }
    ),

    // Remove some log spam
    webpackServer: {
      noInfo: true
    },

    // Location and format of code coverage output
    coverageReporter: {
      type: 'text',
      dir: 'coverage/'
    }
  });
};
