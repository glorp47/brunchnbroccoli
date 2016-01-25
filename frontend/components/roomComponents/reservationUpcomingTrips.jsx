var React = require('react');
var TripStore = require('../../stores/tripStore.js');
// var History = require('react-router').History;

var ReservationUpcomingTrips = React.createClass({
  // mixins: [ History ],

  render: function() {
    // var trips = this.state.trips;
    var trips = this.props.trips;
    // debugger;
    // var history = this.history;
    var trip, checkinStr, checkoutStr, nights;
    // var redirectToTrip = function(tripId) {
    //   // console.log("redirect")
    //   history.pushState(null, "/trips/" + tripId);
    // };
    var tripItems = Object.keys(trips).map(function(tripId){
      trip = trips[tripId];
      checkinStr = moment(trip.checkin, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY')
      checkoutStr = moment(trip.checkout, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY')
      nights = TripStore.nights(tripId);
      return(
        <tr key={tripId}>
          <td>
            <a href={"#/trips/" + tripId}>
              <strong>{checkinStr + " - " + checkoutStr}</strong>
            </a>
          </td>
          <td>
            <a href={"#/trips/" + tripId}>
              <strong>{nights + (nights > 1 ? " nights" : " night")}</strong>
            </a>
          </td>
        </tr>
      )
    });

    return (
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-12">
            <h4>Your Upcoming Stays Here: </h4>
            <table className="table">
              <tbody>
                {tripItems}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ReservationUpcomingTrips;
