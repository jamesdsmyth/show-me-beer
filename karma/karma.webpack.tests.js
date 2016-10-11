// See karma.conf.js for reference to this file.

// Include the babel-polyfill here to fix PhantomJS issues
import 'babel-polyfill';

// Run all "*.spec.js" file in the src directory
const testFileContext = require.context('../src/', true, /.*\.spec\.js$/);
testFileContext.keys().forEach(testFileContext);
