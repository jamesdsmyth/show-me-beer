if (navigator.serviceWorker.controller) {
    // A ServiceWorker controls the site on load and therefor can handle offline
    // fallbacks.
    console.log(`${navigator.serviceWorker.controller.scriptURL} (onload) controller`);
    console.log('An active service worker controller was found, no need to register');
} else {
  // Register the ServiceWorker
    navigator.serviceWorker.register('service-worker.js', {
        scope: './'
    }).then((reg) => {
        console.log(reg.scope, 'register');
        console.log('Service worker change, registered the service worker');
    });
}

// The refresh link needs a cache-busting URL parameter
// document.querySelector('#refresh').search = Date.now();

// Debug helper
// function debug(message, element, append) {
//   // var target = document.querySelector('#' + (element || 'log'));
//   // target.textContent = message + ((append) ? ('/n' + target.textContent) : '');
// }

// // Allow for "replaying" this example
// document.getElementById('clearAndReRegister').addEventListener('click',
//   function() {
//     navigator.serviceWorker.getRegistration().then(function(registration) {
//       registration.unregister();
//       window.location.reload();
//     });
//   }
// );
