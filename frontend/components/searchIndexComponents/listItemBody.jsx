var React = require('react');

var ListItemBody = React.createClass({
  // componentWillReceiveProps: function(newProps) {
  //   debugger;
  // },

  render: function(){
    var room = this.props.room;
    // var hostProfilePicUrl = "https://res.cloudinary.com/dz6em5lpq/image/upload/c_scale,h_115,w_115"
    var hostProfilePicUrl = "https://res.cloudinary.com/dz6em5lpq/image/upload/c_scale,h_115,w_115"
          + room.host_pic_url;
    return (
      <div className="list-item-body" onClick={this.props.handleClick}>
        <div className="body-container">
          <h3
            title={room.title}
            className="listing-name text-truncate row-space-top-1">
              {room.title}
          </h3>
          <div className="box">
            <div className="list-host-pic-container">
              <img
                src={hostProfilePicUrl}
                className="img-responsive img-circle">
              </img>
            </div>
          </div>
          <div className="text-muted listing-location text-truncate">
            <span>
              <h5>
              {room.type_string}
              </h5>
            </span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ListItemBody;
