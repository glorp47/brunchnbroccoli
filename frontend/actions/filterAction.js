var AppDispatcher = require('../dispatcher/dispatcher.js');
var FilterConstants = require('../constants/filterConstants.js');

var FilterActions = {
  updateBounds: function(bounds) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.SEARCHMAPMOVED,
      bounds: bounds
    });
  },

  updateCheckin: function(date) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATECHECKIN,
      date: date
    });
  },

  updateCheckout: function(date) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATECHECKOUT,
      date: date
    });
  },

  updateDates: function(dates) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATEDATES,
      dates: dates
    });
  },

  updateGuests: function(guests) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATEGUESTS,
      guests: guests
    });
  },

  updatePriceRange: function(priceRange) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATEPRICERANGE,
      priceRange: priceRange
    });
  },

  toggleRoomType: function(roomType) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.TOGGLE_ROOM_TYPE,
      roomType: roomType
    });
  },

  resetDates: function() {
    AppDispatcher.dispatch({
      actionType: FilterConstants.RESETDATES
    });
  }





};


module.exports = FilterActions;
