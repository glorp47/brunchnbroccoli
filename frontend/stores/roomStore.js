var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var RoomConstants = require('../constants/roomConstants.js');

var RoomStore = new Store(AppDispatcher);

var _currentRooms = {};

var receiveRooms = function(rooms) {
  // use this if _currentRooms is an array
  // _currentRooms = rooms;
  // use this if _currentRooms is an Object
  _currentRooms = {};
  rooms.forEach(function(room) {
    _currentRooms[room.id] = room;
  });
};

var patchDetail = function(room) {
  _currentRooms[room.id] = room;
};

// var removeRooms = function() {
//   _currentRooms = {};
// };

RoomStore.all = function() {
  return Object.assign({}, _currentRooms);
};

RoomStore.find_by_id = function(roomId) {
  return _currentRooms[roomId];
};


RoomStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case RoomConstants.ROOMS_RECEIVED:
      receiveRooms(payload.rooms);
      RoomStore.__emitChange();
      break;
    case RoomConstants.DETAIL_RECEIVED:
      patchDetail(payload.room);
      RoomStore.__emitChange();
      break;
  }
};

module.exports = RoomStore;
