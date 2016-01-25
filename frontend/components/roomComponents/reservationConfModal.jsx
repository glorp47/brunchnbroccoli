var React = require('react');
var Modal = require('react-bootstrap').Modal;
var TripStore = require('../../stores/tripStore.js');

var ReservationConfModal = React.createClass({
  // getInitialState: function() {
  //   return ({
  //     trip: TripStore.newTrip()
  //   });
  // },

  closeModal: function() {
    this.props.onHide();
  },


  render: function() {
    // debugger;
    if(!this.props.show) {
      return null;
    }
    var room = this.props.room;
    var trip = this.props.trip;
    var hasMessage = trip.message.length > 0;
    // need to refactor pricing
    var ppn = room.price;
    var cleaningFee = 30;
    var serviceFee = 30;
    var taxesP = 0.1;
    var nights = TripStore.nights(trip.id);
    var checkinStr = moment(trip.checkin, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY');
    var checkoutStr = moment(trip.checkout, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY');
    return (
      <Modal
        {...this.props}
        ref="rsvpconfmodal"
        className="customclass"
        bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title id="RsvpConfModalHeader">
            <span
              className="glyphicon glyphicon-send"
              ariaHidden="true"
              style={{color:"blue"}}/> Your request has been sent to your host {room.host_fname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="col-xs-12 col-md-8">
                <div className="row">
                  <h4>Reservation id: {trip.id}</h4>
                  <p>
                    <span
                      className="glyphicon glyphicon-time"
                      ariaHidden="true"
                      style={{color:"gray"}}/> You can expect a response from {room.host_fname} within the next 12 hours.
                  </p>
                  <p>
                    <span
                      className="glyphicon glyphicon-credit-card"
                      ariaHidden="true"
                      style={{color:"gray"}}/> Your credit card will not be charged until your request is approved.
                  </p>
                  <p>
                    <span
                      className="glyphicon glyphicon-earphone"
                      ariaHidden="true"
                      style={{color:"gray"}}/> You will be provided with the room's address and {room.host_fname + "'s"} contact information once {room.host_fname} approves your request.
                  </p>
                </div>

                <div className="row">
                  <h3>Summary of Your Request</h3>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          Checkin
                        </td>
                        <td>
                          {checkinStr}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Checkout
                        </td>
                        <td>
                          {checkoutStr}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Nights
                        </td>
                        <td>
                          {nights}
                        </td>
                      </tr>
                      <tr style={{borderBottom: "2px solid #ddd"}}>
                        <td>
                          Guest(s)
                        </td>
                        <td>
                          {trip.guests}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          {"$" + ppn + " per night × " + nightsStr}
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
                          AMEX xxxxxxxxxx3001
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {hasMessage ? (
                  <div className="row">
                    <h3>Your Message to {room.host_fname}</h3>
                    <p>
                      {trip.message}
                    </p>
                  </div>
                ) : ""}

                <div className="row">
                  <div className="col-xs-12">
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.props.onHide}>
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
            </div>

            <div className="col-xs-12 col-md-4">

            </div>



          </div>
        </Modal.Body>
      </Modal>
    )
  }

});

module.exports = ReservationConfModal;
