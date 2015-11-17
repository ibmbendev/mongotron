'use strict';

var ipc = require('ipc');

angular.module('app', [
  'ui.bootstrap',
  'ngAnimate',
  'ui.sortable',
  'ngSanitize',
  'duScroll',
  'ngPrettyJson',
  'autoGrowInput'
]);

angular.module('app').run([
  '$rootScope',
  '$log',
  'modalService',
  'tabCache',
  function($rootScope, $log, modalService, tabCache) {
    $rootScope.themes = initThemes();

    $rootScope.currentQuery = null;

    $rootScope.setTitle = function(title) {
      ipc.send('set-title', title);
    };

    var pageTitle = 'Mongotron';
    $rootScope.setTitle(pageTitle);

    $rootScope.showConnections = function(state, $event) {
      if ($event) $event.preventDefault();

      modalService.openConnectionManager(state)
        .result
        .then(function() {
          $rootScope.setTitle(pageTitle);
        });
    };

    $rootScope.showSettings = function($event) {
      if ($event) $event.preventDefault();

      var settingsTabName = 'Settings';

      if (!tabCache.existsByName(settingsTabName)) {
        tabCache.add({
          type: tabCache.TYPES.PAGE,
          iconClassName: 'fa fa-wrench',
          name: settingsTabName,
          src: __dirname + '/components/settings/settings.html'
        });
      } else {
        tabCache.activateByName(settingsTabName);
      }
    };

    $rootScope.showLogs = function($event) {
      if ($event) $event.preventDefault();

      var logsTabName = 'Logs';

      if (!tabCache.existsByName(logsTabName)) {
        tabCache.add({
          type: tabCache.TYPES.PAGE,
          iconClassName: 'fa fa-cog',
          name: logsTabName,
          src: __dirname + '/components/logs/logs.html'
        });
      } else {
        tabCache.activateByName(logsTabName);
      }
    };

    function initThemes() {
      return {
        //current: 'default',
        // current: 'isotope-ui',
        current: 'atom'
      };
    }
  }
]);
