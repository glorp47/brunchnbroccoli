var React = require('react');

var RoomHeader = React.createClass({

  render: function() {
    var room = this.props.room;
    // var
    var hostProfilePicUrl = "https://res.cloudinary.com/dz6em5lpq/image/upload/c_scale,w_200"
          + room.host_pic_url;
    var room_icon_url;
    if(room.type_id === 1) {
      room_icon_url = "/assets/icons/entire_home_100.png"
    } else if (room.type_id === 2) {
      room_icon_url = "/assets/icons/private_room_100.png"
    } else {
      room_icon_url = "/assets/icons/shared_room_100.png"
    }
    // debugger;
    return (
      <div className="col-md-6 col-md-offset-1 room-header">
        <div className="row">
          <div className="col-xs-3">
            <div className="row">
              <div className="box center">
                <div className="room-host-pic-container">
                  <img
                    src={hostProfilePicUrl}
                    className="img-responsive img-circle">
                  </img>
                </div>
              </div>
            </div>

            <div className="row">
              <h4 className="center">{room.host_fname}</h4>
            </div>
          </div>

          <div className="col-xs-9">
            <div className="row">
              <h2 className="room-title">{room.title}</h2>
            </div>

            <div className="row">
              <h4 className="room-city">{room.city}</h4>
            </div>

            <div className="row">
              <div className="col-xs-4">
                <div className="row center">
                </div>
                <div className="row center">
                  <h4>{room.type_string}</h4>
                </div>
              </div>

              <div className="col-xs-4">
                <div className="row center">
                </div>
                <div className="row center">
                  <h4>{room.max_guest_num + " Guest" + (room.max_guest_num > 1 ? "s" : "")}</h4>
                </div>
              </div>

              <div className="col-xs-4">
                <div className="row center">
                </div>
                <div className="row center">
                  <h4>{room.bed_num + " Bed" + (room.bed_num > 1 ? "s" : "")}</h4>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RoomHeader;
