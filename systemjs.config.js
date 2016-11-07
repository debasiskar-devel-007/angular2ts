/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      "ng2-modal": "node_modules/ng2-modal",
      "ng2-popover": "node_modules/ng2-popover",
      'angular2-cookie':'npm:angular2-cookie',
      'ng2-pagination':'npm:ng2-pagination',
      "ng2-ckeditor": "npm:ng2-ckeditor",

      'ng2-slim-loading-bar': 'node_modules/ng2-slim-loading-bar',



      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      "ng2-modal": { "main": "index.js", "defaultExtension": "js" },
      "ng2-popover": { "main": "index.js", "defaultExtension": "js" },
      'angular2-cookie': {
        main: './core.js',
        defaultExtension: 'js'
      },
      'ng2-pagination':{
        "main": "index.js", "defaultExtension": "js"
      },
      "ng2-ckeditor": {
        "main": "lib/index.js",
        "defaultExtension": "js",
      },
      'ng2-slim-loading-bar':  { main: 'index.js',  defaultExtension: 'js' },
    }
  });
})(this);
