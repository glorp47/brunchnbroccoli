var FilterStore = require('../stores/filterStore.js');
// var RsvpStore = require('../stores/rsvpStore.js');
var QueryStore = require('../stores/queryStore.js');

var ApiUtil = {
  createUserAccount: function(credentials, receiveNewUser) {
    $.ajax({
      url: 'api/users',
      method: "post",
      data: {user: credentials},
      success: function(user){
                receiveNewUser(user);
              },
      error: function(error, status){
                debugger;
                // console.log(status)
              }
    });
  },

  createSession: function(credentials, receiveCurrentUser) {
    $.ajax({
      url: 'api/session',
      method: "post",
      data: {user: credentials},
      success: function(user) {
                receiveCurrentUser(user);
              },
      error: function(error, status) {
                debugger;
                // console.log(status);
              }
    });
  },

  // checkAndFetchSession: function() {
  //
  // },

  fetchSession: function(receiveCurrentUser) {
    $.ajax({
      url: 'api/session',
      method: "get",
      success: function(user){
                  if (user !== null) {
                    receiveCurrentUser(user);
                  } else {
                    console.log("not logged in");
                  }
                },
      error: function(error, status){
                  // debugger;
                  console.log("error");
                }
    });
  },

  destroySession: function(removeCurrentUser) {
    $.ajax({
      url: 'api/session',
      method: "delete",
      success: function(){
                  removeCurrentUser();
                },
      error: function(error, status){
                  debugger;
                  // console.log(status)
                }
    });
  },

  // for initial testing only
  fetchAllRooms: function(receiveAllRoomsCB) {
    $.ajax({
      url: 'api/rooms',
      method: "get",
      success: function(rooms){
                  receiveAllRoomsCB(rooms);
                },
      error: function(error, status){
                  debugger;
                  // console.log(status)
                }
    });
  },

  fetchFilteredRooms: function(receiveFilteredRoomsCB) {
    // debugger;
    $.ajax({
      url: 'api/rooms',
      method: "get",
      dataType: 'json',
      data: {filter: FilterStore.params()},
      success: function(rooms){
                  receiveFilteredRoomsCB(rooms);
                },
      error: function(error, status){
                  debugger;
                  // console.log(status)
                }
    });
  },

  fetchRoomDetail: function(roomId, receiveDetailCB) {
    $.ajax({
      url: 'api/rooms/'+ roomId,
      method: "get",
      success: function(room){
        console.log(room);
                  receiveDetailCB(room);
                },
      error: function(error, status){
                  debugger;
                  // console.log(status)
                }
    });
  },

  queryAvailability: function(roomId, queryCB) {
    // debugger;
    var dates = FilterStore.currentDates();
    var guests = FilterStore.currentGuests();
    $.ajax({
      url: 'api/reservations/query/',
      method: "get",
      data: {rquery: {
        room_id: roomId,
        start_date: new Date(dates.checkin),
        end_date: new Date(dates.checkout),
        guest_num: guests
      }},
      success: function(response){
                  queryCB(response);
                },
      error: function(error, status){
                  debugger;
                  // console.log(status)
                }
    });
  },

  createReservation: function(message, receiveNewTripConfCB) {
    var queryResult = QueryStore.all();
    // debugger;
    $.ajax({
      url: 'api/reservations/',
      method: "post",
      dataType: "json",
      data: {reservation: {
        room_id: queryResult.roomId,
        start_date: new Date(queryResult.checkin),
        end_date: new Date(queryResult.checkout),
        guest_num: queryResult.guests
        ,
        message: message
      }},
      success: function(newTrip){
                  // debugger;
                  receiveNewTripConfCB(newTrip);
                },
      error: function(error, status){
                  debugger;
                  // console.log(status)
                }
    });
  },

  fetchTrips: function(receiveUserTripsCB) {
    $.ajax({
      url: 'api/reservations/trips',
      method: "get",
      success: function(trips){
                  receiveUserTripsCB(trips);
                },
      error: function(error, status){
                  debugger;
                  // console.log(status)
                }
    });
  }

};

module.exports = ApiUtil;
