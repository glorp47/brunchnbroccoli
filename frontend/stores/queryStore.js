var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var QueryConstants = require('../constants/queryConstants.js');
var QueryStore = new Store(AppDispatcher);

// var _rsvpConfParams = {
//   roomId: "",
//   checkin: "",
//   checkout: "",
//   guests: "",
//   status: ""
// };
//
// var _rsvpStatus = {
//   verified: false,
//   avail: false,
//   booked: false
// };

var _currentQuery = {
  availability: null,
  roomId: null,
  checkin: null,
  checkout: null,
  guests: 1
};

 // phase B datepicker
// var _unavailableDates = [];

var receiveResponse = function(response) {
  _currentQuery = {
    availability: response.availability,
    roomId: response.room_id,
    checkin: moment(response.start_date, "YYYY-MM-DD").format("MM/DD/YYYY"),
    checkout: moment(response.end_date, "YYYY-MM-DD").format("MM/DD/YYYY"),
    guests: response.guest_num
  };
  // debugger;
};

var resetQueryStore = function() {
  _currentQuery = {
    availability: null,
    roomId: null,
    checkin: null,
    checkout: null,
    guests: 1
  };
};



QueryStore.all = function() {
  return Object.assign({}, _currentQuery);
};

QueryStore.isVerified = function(){
  return _currentQuery.availability !== null;
};

QueryStore.isAvailable = function(){
  // debugger;
  return _currentQuery.availability;
};

QueryStore.hasDates = function() {
  return _currentQuery.checkin !== null && _currentQuery.checkout !== null
};

QueryStore.queryDates = function() {
  return {
    checkin: _currentQuery.checkin,
    checkout: _currentQuery.checkout
  };
};

QueryStore.queryGuests = function() {
  return _currentQuery.guests;
};

QueryStore.nights = function() {
  if (QueryStore.hasDates()) {
    var mCheckin = moment(_currentQuery.checkin, 'MM-DD-YYYY');
    var mCheckout = moment(_currentQuery.checkout, 'MM-DD-YYYY');
    return mCheckout.diff(mCheckin, 'days');
  } else {
    return null;
  }
};

QueryStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case QueryConstants.RECEIVE_QUERY_RESPONSE:
      receiveResponse(payload.response);
      QueryStore.__emitChange();
      break;
    case QueryConstants.RESET_QUERYSTORE:
      resetQueryStore();
      QueryStore.__emitChange();
      break;

  }
};


module.exports = QueryStore;
