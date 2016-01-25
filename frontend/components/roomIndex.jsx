var React = require('react');
var RoomStore = require('../stores/roomStore.js');
var RoomAction = require('../actions/roomAction.js');

var LoadingScreen = require('./loadingScreen.jsx');

var RoomImage = require('./roomComponents/roomImage.jsx');
var RoomDetails = require('./roomComponents/roomDetails.jsx');
var RoomHeader = require('./roomComponents/roomHeader.jsx');
var ReservationTab = require('./roomComponents/reservationTab.jsx');

var RoomIndex = React.createClass({
  getInitialState: function() {
    var roomId = this.props.params.roomId;
    // debugger;
    var room = RoomStore.find_by_id(roomId);
    return({
      room: room || {},
      hasDetail: false
    });
  },

  _updateRoom: function() {
    var room = RoomStore.find_by_id(this.props.params.roomId);

    // for testing only
    room['hasDetail'] = true;
    // for testing only

    this.setState({
      room: room,
      hasDetail: room.hasDetail
    });
  },

  componentWillReceiveProps: function(newProps) {
    var newRoomId = newProps.params.roomId;
    if(this.state.room.id.toString() !== newRoomId) {
      this.setState({
        hasDetail: false
      });
      RoomAction.fetchRoomDetail(newRoomId);
    }
  },

  componentWillUnmount: function() {
    this.roomIndexToken.remove();
  },

  componentDidMount: function() {
    this.roomIndexToken = RoomStore.addListener(this._updateRoom);
    RoomAction.fetchRoomDetail(this.props.params.roomId);
  },


  render: function() {
    if (this.state.hasDetail) {
      var room = this.state.room;
      // debugger;
      // may need to refactor using nested route
      return (
        <div className="container-fluid full-width below-nav room">
          <RoomImage room={room}/>
          <div className="row room-header-row no-margin">
            <RoomHeader room={room} />
            <ReservationTab room={room}/>
          </div>
          <RoomDetails room={room}/>
        </div>
      );
    } else {
      return(
        <LoadingScreen />
      );
    }
  }


});

module.exports = RoomIndex;
