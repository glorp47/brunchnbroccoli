var React = require('react');

var ReservationMap = React.createClass({
  render: function() {

    // may switch to google maps js api
    var lat = this.props.room.lat.toString();
    var lng = this.props.room.lng.toString();

    var staticMapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" +
          lat + "," + lng +
          "&zoom=12&size=400x400&maptype=roadmap&markers=color:red%7C" +
          lat + "," + lng + "&key=AIzaSyCtYLxe36ZACT2bRLmcefUJ_EG2Nzm7n04"
    return (
      <div className="col-xs-12 ">
        <img
          className="img-responsive center-block"
          src={staticMapUrl} />
      </div>
    );
  }
});

module.exports = ReservationMap;
