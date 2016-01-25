var AppDispatcher = require('../dispatcher/dispatcher.js');
var QueryConstants = require('../constants/queryConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var QueryActions = {
  checkAvailability: function(roomId) {
    ApiUtil.queryAvailability(roomId, this.updateAvailability);
  },

  resetQuery: function() {
    AppDispatcher.dispatch({
      actionType: QueryConstants.RESET_QUERYSTORE
    });
  },

  updateAvailability: function(response) {
    // debugger;
    AppDispatcher.dispatch({
      actionType: QueryConstants.RECEIVE_QUERY_RESPONSE,
      response: response
    });
  }
};

module.exports = QueryActions;
