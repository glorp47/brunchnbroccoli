var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var FilterConstants = require('../constants/filterConstants.js');

var FilterStore = new Store(AppDispatcher);

var _currentParams = {
  bounds: null,
  dates: {
    checkin: null,
    checkout: null
        },
  guests: 1,
  roomTypes: {
    1: true,
    2: true,
    3: true
  },
  priceRange: {
    min: 50,
    max: 400
  }
};

var _updateBounds = function(bounds) {
  _currentParams.bounds = bounds;
};

var _updateCheckin = function(date) {
  _currentParams.dates.checkin = date;
};

var _updateCheckout = function(date) {
  _currentParams.dates.checkout = date;
};

var _updateDates = function(dates) {
  _currentParams.dates = dates;
}

var _updateGuests = function(guests) {
  _currentParams.guests = guests;
};

var _updatePriceRange = function(priceRange) {
  _currentParams.priceRange = priceRange;
};

var _toggleRoomType = function(roomType) {
  _currentParams.roomTypes[roomType] = !(_currentParams.roomTypes[roomType]);
};

var _resetDates = function() {
  console.log("dates-reset")
  _currentParams.dates = {checkin: null, checkout: null};
};




FilterStore.params = function() {
  // // for initial testing only
  // if (typeof _currentParams.bounds === 'undefined') {
  //   _currentParams.bounds = {
  //     northEast: {
  //       lat: 37.818731361235045,
  //       lng: -122.39405876159668
  //     },
  //     southWest: {
  //       lat: 37.71437771589192,
  //       lng: -122.46838813781739
  //     }
  //   }
  // }
  // // for initial testing only
  // debugger;

  return Object.assign({}, _currentParams);
};

FilterStore.currentDates = function() {
  // if (typeof _currentParams.dates === 'undefined') {
  //   return {checkin: "", checkout: ""};
  // } else {
  //   return _currentParams.dates;
  // }
  return _currentParams.dates || {checkin: null, checkout: null};
};

FilterStore.hasDates = function() {
  return _currentParams.dates && _currentParams.dates.checkin && _currentParams.dates.checkout;
};

FilterStore.nights = function() {
  if (FilterStore.hasDates()) {
    var mCheckin = moment(_currentParams.dates.checkin, 'MM-DD-YYYY');
    var mCheckout = moment(_currentParams.dates.checkout, 'MM-DD-YYYY');
    return mCheckout.diff(mCheckin, 'days');
  } else {
    return null;
  }
};

FilterStore.currentGuests = function() {
  return _currentParams.guests || "1";
};

FilterStore.currentRoomTypes = function() {
  // return Object.keys(_currentParams.roomTypes).filter(function(roomType) {
  //   return _currentParams.roomTypes[roomType];
  // });
  return Object.assign({}, _currentParams.roomTypes)
};


FilterStore.currentMinPrice = function() {
  return _currentParams.priceRange.min;
};

FilterStore.currentMaxPrice = function() {
  return _currentParams.priceRange.max;
};



FilterStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case FilterConstants.SEARCHMAPMOVED:
      _updateBounds(payload.bounds);
      FilterStore.__emitChange();
      break;
    case FilterConstants.UPDATECHECKIN:
      _updateCheckin(payload.date);
      FilterStore.__emitChange();
      break;
    case FilterConstants.UPDATECHECKOUT:
      _updateCheckout(payload.date);
      FilterStore.__emitChange();
      break;
    case FilterConstants.UPDATEDATES:
      _updateDates(payload.dates);
      FilterStore.__emitChange();
    case FilterConstants.UPDATEGUESTS:
      _updateGuests(payload.guests);
      FilterStore.__emitChange();
      break;
    case FilterConstants.UPDATEPRICERANGE:
      _updatePriceRange(payload.priceRange);
      FilterStore.__emitChange();
      break;
    case FilterConstants.TOGGLE_ROOM_TYPE:
      _toggleRoomType(payload.roomType);
      FilterStore.__emitChange();
      break;
    case FilterConstants.RESETDATES:
      _resetDates();
      FilterStore.__emitChange();
      break;


  }
};



module.exports = FilterStore;
