var React = require('react');
var TripStore = require('../../stores/tripStore.js');

var TripDetail = React.createClass({
  getInitialState: function() {
    return ({
      trip: TripStore.find_by_id(parseInt(this.props.params.tripId))
    });
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      trip: TripStore.find_by_id(parseInt(newProps.params.tripId))
    });
  },



  render: function() {
    var trip = this.state.trip
    if(typeof trip === 'undefined' || trip === null ) return null;
    var img_url = "https://res.cloudinary.com/dz6em5lpq/image/upload/c_scale,w_250"
     + trip.room_pic
    var checkinStr = moment(trip.checkin, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY');
    var checkoutStr = moment(trip.checkout, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY');
    var nights = TripStore.nights(trip.id);
    var ppn = trip.room_price;
    var cleaningFee = 30;
    var serviceFee = 30;
    var taxesP = 0.1;

    return (
      <div className="trip-detail-container">
        <div className="row">
          <div className="col-xs-6">
            <h2>
              <strong>{trip.status_id === 1 ? "Itinerary" : "Reservation"}</strong>
            </h2>
            <br />
            <p>
              {"Status: "}
              <strong>{trip.status}</strong>
              <br />
              {trip.status_id === 1 ? "Confirmation Code: " : "Reservation Code: "}
              <strong>{trip.id}</strong>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-xs-12">
                <h4><strong>Check In</strong></h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p>
                  <strong>{checkinStr}</strong>
                  <br />Flexible check in time
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row">
              <div className="col-xs-12">
                <h4><strong>Check Out</strong></h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p>
                  <strong>{checkoutStr}</strong>
                  <br />Flexible check out time
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-2 center">
            <div className="row">
              <div className="col-xs-12">
                <h4><strong>{nights > 1 ? "Nights" : "Night"}</strong></h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p><strong>{nights}</strong></p>
              </div>
            </div>
          </div>
          <div className="col-md-2 center">
            <div className="row">
              <div className="col-xs-12">
                <h4><strong>{trip.guests > 1 ? "Guests" : "Guest"}</strong></h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <p><strong>{trip.guests}</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={"#/rooms/" + trip.roomId}>
                <strong>{trip.room_title}</strong>
              </a>
            </h4>
            <p>{trip.room_city}</p>
            <p>
              {"Host name: " + trip.host_fname}
              <br />
              <span className="glyphicon glyphicon-earphone" ariaHidden="true"></span>
              {" (917)456-7890"}
            </p>
          </div>
          <div className="col-md-6">
            <div className="trip-item-image">
              <img
                src={img_url}
                className="img-responsive list-image">
              </img>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h4><strong>Receipt</strong></h4>
          </div>
          <div className="col-xs-12 col-md-offset-3 col-md-6">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    {"$" + ppn + " per night × " + nights + (nights > 1 ? "nights" : "night")}
                  </td>
                  <td>
                    {"$" + ppn*nights}
                  </td>
                </tr>
                <tr>
                  <td>
                    Cleaning fee
                  </td>
                  <td>
                    {"$" + cleaningFee}
                  </td>
                </tr>
                <tr>
                  <td>
                    Service fee
                  </td>
                  <td>
                    {"$" + serviceFee}
                  </td>
                </tr>
                <tr>
                  <td>
                    Occupancy Taxes
                  </td>
                  <td>
                    {"$" + Math.floor(ppn*nights*taxesP)}
                  </td>
                </tr>
                <tr  style={{borderBottom: "2px solid #ddd"}}>
                  <td>
                    Total
                  </td>
                  <td>
                    {"$" + (ppn*nights + cleaningFee + serviceFee + Math.floor(ppn*nights*taxesP))}
                  </td>
                </tr>
                <tr>
                  <td>
                    Credit Card
                  </td>
                  <td>
                    VISA xxxxxxxxxx0319
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TripDetail;
