var React = require('react');

var TripListItem = React.createClass({

  handleClick: function() {
    this.props.history.pushState(null, '/trips/' + this.props.trip.id);
    this.props.highlightTripId(this.props.trip.id);
  },

  render: function() {
    var trip = this.props.trip;
    var className = "list-group-item cursor-pointer"
    // debugger;
    if(trip.id === this.props.activeTripId) {
      className += " active";
    }
    return(
      <a
        onClick={this.handleClick}
        className={className}>
        <h4 className="list-group-item-heading">{trip.room_city + ": " + trip.room_title}</h4>
        <p className="list-group-item-text">{trip.checkin + " - " + trip.checkout}</p>
        <p className="list-group-item-text">{trip.status}</p>
      </a>
    );
  }

});

module.exports = TripListItem;
