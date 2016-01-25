var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var TripConstants = require('../constants/tripConstants.js');
var TripStore = new Store(AppDispatcher);

// var _rsvpConfParams = {
//   roomId: null,
//   host_fname: null,
//   checkin: null,
//   checkout: null,
//   guests: null,
//   status: null
// };

// trip is the same as reservation but from guest perspective


var _trips = {};

var _newTripReservationId = null;

var _categories = {
  upcoming: [],
  current: [],
  past: []
};

 // phase B datepicker
// var _unavailableDates = [];

var resetTripStore = function() {
  _trips = {};

  _newTripReservationId = null;

  _categories = {
    upcoming: [],
    current: [],
    past: []
  };
};

var tripBasicInfoConversion = function(trip) {
  return ({
    id: trip.id,
    roomId: trip.room_id,
    checkin: moment(trip.start_date, "YYYY-MM-DD").format("MM/DD/YYYY"),
    checkout: moment(trip.end_date, "YYYY-MM-DD").format("MM/DD/YYYY"),
    guests: trip.guest_num,
    message: trip.message
  });
};

var addTripDetails = function(responseTrip, convertedTrip) {
  convertedTrip["room_city"] = responseTrip.room_city;
  convertedTrip["room_title"] = responseTrip.room_title;
  convertedTrip["room_pic"] = responseTrip.room_pic;
  convertedTrip["room_price"] = responseTrip.room_price;
  convertedTrip["host_fname"] = responseTrip.host_fname;
  convertedTrip["status_id"] = responseTrip.status_id;
  convertedTrip["status"] = responseTrip.status;
  return convertedTrip;
};

var receiveNewTrip = function(newTrip) {
  _newTripReservationId = newTrip.id;
  convertedTrip = tripBasicInfoConversion(newTrip);
  _trips[_newTripReservationId] = convertedTrip;
  categorize(convertedTrip);
  // debugger;
};

var receiveUserTrips = function(trips) {
  resetTripStore();
  trips.forEach(function(trip) {
    convertedTrip = tripBasicInfoConversion(trip);
    categorize(convertedTrip);
    _trips[trip.id] = addTripDetails(trip, convertedTrip);
  });
};

var categorize = function(trip) {
  var mCheckin = moment(trip.checkin, "MM-DD-YYYY");
  var mCheckout = moment(trip.checkout, "MM-DD-YYYY");
  var mToday = moment().startOf('day');
  if (mCheckout.diff(mToday) < 0) {
    _categories.past.push(trip.id)
  } else if (mCheckin.diff(mToday) > 0) {
    _categories.upcoming.push(trip.id)
  } else {
    _categories.current.push(trip.id);
  }
};

TripStore.all = function() {
  return Object.assign({}, _trips);
};

TripStore.newTrip = function(){
  return _trips[_newTripReservationId] || {};
};

TripStore.hasNewConf = function() {
  return _newTripReservationId !== null;
};

TripStore.nights = function(tripId) {
  if (tripId in _trips) {
    var mCheckin = moment(_trips[tripId].checkin, 'MM-DD-YYYY');
    var mCheckout = moment(_trips[tripId].checkout, 'MM-DD-YYYY');
    return mCheckout.diff(mCheckin, 'days');
  } else {
    return null;
  }
};

TripStore.find_by_id = function(tripId) {
  return _trips[tripId] || null;
};

TripStore.getTripsInCategory = function(category) {
  if (category === "all trips") {
    return TripStore.all();
  } else {
    var result = {};
    _categories[category].forEach(function(tripId) {
      result[tripId] = _trips[tripId];
    });
    return result;
  }
};

TripStore.upcomingTripsWithRoom = function(roomId) {
  var result = {};
  _categories.upcoming.forEach(function(tripId) {
    if(_trips[tripId].roomId.toString() === roomId.toString()){
      result[tripId] = _trips[tripId];
    };
  });
  // debugger;
  return result;
};

TripStore.currentTrips = function() {
  var result = {};
};

TripStore.pastTrips = function() {
  var result = {};
};



TripStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case TripConstants.TRIPS_RECEIVED:
      receiveUserTrips(payload.trips);
      TripStore.__emitChange();
      break;
    case TripConstants.TRIP_REQUEST_SUBMITTED:
      receiveNewTrip(payload.newTrip);
      TripStore.__emitChange();
      break;
    case TripConstants.RESET_TRIPSTORE:
      resetTripStore();
      TripStore.__emitChange();
      break;


      // phase B datepicker
    // case RsvpConstants.UNAVAILABILITY_RECEIVED:

  }
};


module.exports = TripStore;
