var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var JSLoaderConstants = require('../constants/jsLoaderConstants.js');

var JSLoaderStore = new Store(AppDispatcher);

var _extJSLib = {
  gMaps: false
};

JSLoaderStore.isReady = function(jsLib) {
  return _extJSLib[jsLib];
};

JSLoaderStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case JSLoaderConstants.GMAPS_READY:
      _extJSLib.gMaps = true;
      console.log("gmaps is ready");
      JSLoaderStore.__emitChange();
      break;
    // case RoomConstants.REMOVECURRENTUSER:
    //   removeRooms();
    //   RoomStore.__emitChange();
    //   break;
  }
};

module.exports = JSLoaderStore;
