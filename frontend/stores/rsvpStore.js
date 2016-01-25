var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var RsvpConstants = require('../constants/rsvpConstants.js');
var RsvpStore = new Store(AppDispatcher);

var _rsvpConfParams = {
  roomId: null,
  host_fname: null,
  checkin: null,
  checkout: null,
  guests: null,
  status: null
};

var _newRsvpId = null;

 // phase B datepicker
// var _unavailableDates = [];

var resetRsvpStore = function() {
  _rsvpConfParams = {
    roomId: "",
    checkin: "",
    checkout: "",
    guests: "",
    status: ""
  };

  _rsvpStatus = {
    verified: false,
    avail: false,
    booked: null
  }
};

var verified = function(avail) {
  _rsvpStatus = {
    verified: true,
    avail: avail,
    booked: null
  };
};

var receiveNewRsvp = function(reservation) {
  // _rsvpConfParams = {
  //   reservationId: reservation.id,
  //   roomId: reservation.roomId,
  //   checkin: "",
  //   checkout: "",
  //   guests: "",
  //   status: ""
  // };

  _rsvpStatus = {
    verified: true,
    avail: true,
    booked: "new"
  }
};

RsvpStore.all = function() {
  return Object.assign({}, _rsvpParams);
};

RsvpStore.isVerified = function(){
  return _rsvpStatus.verified;
};

RsvpStore.isAvailable = function(){
  return _rsvpStatus.verified && _rsvpStatus.avail;
};

RsvpStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case RsvpConstants.DETAILS_RECEIVED:
      verified(payload.avail);
      RsvpStore.__emitChange();
      break;
    case RsvpConstants.RSVP_CONFIRMED:
      receiveNewRsvp(payload.reservation);
      RsvpStore.__emitChange();
    case RsvpConstants.RESET_RSVPSTORE:
      resetRsvpStore();
      RsvpStore.__emitChange();
      break;

      // phase B datepicker
    // case RsvpConstants.UNAVAILABILITY_RECEIVED:

  }
};


module.exports = RsvpStore;
