var React = require('react');
var RoomStore = require('../stores/roomStore.js');
var LoadingScreen = require('./loadingScreen.jsx');
//

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

  componentWillUnmount: function() {
    this.roomIndexToken.remove();
  },

  componentDidMount: function() {
    this.roomIndexToken = RoomStore.addListener(this._updateRoom);
    RoomAction.fetchRoomDetail(this.props.params.roomId);
  },


  render: function() {
    if (this.state.hasDetail) {
      return (
        <div className="container-fluid full-width below-nav room">

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
