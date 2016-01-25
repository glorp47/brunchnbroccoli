var AppDispatcher = require('../dispatcher/dispatcher.js');
var JSLoaderConstants = require('../constants/jsLoaderConstants.js');

var JSLoaderActions = {
  gMapsReady: function() {
    AppDispatcher.dispatch({
      actionType: JSLoaderConstants.GMAPS_READY
    });
  }
}

module.exports = JSLoaderActions;
