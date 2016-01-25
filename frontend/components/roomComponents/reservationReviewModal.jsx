var React = require('react');
var Modal = require('react-bootstrap').Modal;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var QueryStore = require('../../stores/queryStore.js');

var ReservationReviewModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return({
      processing: false,
      message: ""
    })
  },


  closeModal: function() {
    this.props.onHide();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({
      processing: true
    });
    setTimeout(function(){
      this.props.submitReservation(this.state.message);
      this.setState({
        processing: false,
        message: ""
      })
    }.bind(this), 1000);
  },

  // componentWillUnmount: function() {
  //   this.refs.rsvpmodal._onHide();
  // },

  render: function() {
    if (QueryStore.isAvailable() !== true) {
      return null;
    }
    var room = this.props.room;
    var roomPicUrl = "https://res.cloudinary.com/chenjm8683/image/upload/c_scale,w_600" + room.primary_pic_url;
    var hostPicUrl = "https://res.cloudinary.com/chenjm8683/image/upload/c_scale,w_150" + room.host_pic_url;
    var isDisabled = this.state.processing;
    var guests = QueryStore.queryGuests();
    var dates = QueryStore.queryDates();
    var nights = QueryStore.nights();
    var nightsStr = nights.toString() + (nights > 1 ? " nights" : "night");
    var taxesP = 0.1;
    var cleaningFee = 30;
    var serviceFee = 30;
    // debugger;

    // need to fix small screen
    return (
      <Modal
        {...this.props}
        ref="rsvpmodal"
        className="customclass"
        bsSize="large"
        backdrop="static">
        <Modal.Header>
          <button
             type="button"
             className="btn btn-warning"
             aria-label="Close"
             style={{float: "right"}}
             onClick={this.closeModal}
             disabled={isDisabled}>
             Cancel
           </button>
          <Modal.Title id="RsvpModalHeader">Confirm Your Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="col-xs-12 col-md-7">
              <form
                 className="input-group col-xs-12"
                 onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="payment-container">
                    <h3>Payment</h3>
                    <div className="form-group col-xs-6">
                    <label htmlFor="payment-method">Payment Method</label>
                      <select
                         className="form-control"
                         id="payment-method"
                         disabled={isDisabled}>
                        <option>AMEX xxxxxxxxxx3001</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <h3>Introduce Yourself to {room.host_fname}</h3>
                  <p>Giving your host more information will make them more likely to confirm your booking request:</p>
                  <div className="row">
                    <div className="col-xs-2 no-padding-right">
                      <img
                        className="img-responsive img-circle"
                        src={hostPicUrl} />
                    </div>
                    <div className="col-xs-10 no-padding-left">
                      <ul>
                        <li>Tell {room.host_fname} a little about yourself</li>
                        <li>What brings you to {room.city}? Who’s joining you?</li>
                        <li>What do you love about this listing? Mention it!</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row row-space-3">
                  <div className="input-group col-xs-12">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Message your host..."
                      valueLink={this.linkState("message")}
                      disabled={isDisabled}>
                    </textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xs-12">
                    <div className="row">
                      <div className="checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="agreement"
                            required
                            title="Before booking agree to the House Rules and Terms."
                            disabled={isDisabled}>
                          </input>
                          I agree to the House Rules, Cancellation Policy, and to the Guest Refund Policy. I also agree to pay the total amount shown, which includes Occupancy Taxes and Service Fees.
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <button
                        type="submit"
                        className="btn btn-primary center-block"
                        disabled={isDisabled}>
                        {isDisabled ? "Processing..." : "Confirm Booking"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-xs-12 col-md-offset-1 col-md-4">
              <div className="row">
                <img
                   className="img-thumbnail"
                   src={roomPicUrl} />
              </div>
              <div className="row">
                <h4>{room.title}</h4>
                <p>{room.city}</p>
              </div>
              <div className="row">
                <p>
                  <strong>{room.type_string}</strong>
                  {" for "}
                  <strong>{guests + (guests === "1" ? " guest" : " guests")}</strong>
                </p>
                <p>
                  {"From "}
                  <strong>
                    {moment(dates.checkin, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY')}
                  </strong>
                  {" to "}
                  <strong>
                    {moment(dates.checkout, 'MM-DD-YYYY').format('ddd, MMM DD, YYYY')}
                  </strong>
                </p>
              </div>
              <div className="row">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        {"$" + room.price + " × " + nightsStr }
                      </td>
                      <td>
                        {"$" + room.price * nights}
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
                        {"$" + Math.floor(room.price*nights*taxesP)}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Total
                      </td>
                      <td>
                        {"$" + (room.price*nights + cleaningFee + serviceFee + Math.floor(room.price*nights*taxesP))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>



          </div>
        </Modal.Body>
      </Modal>
    );
  }
});

module.exports = ReservationReviewModal;
