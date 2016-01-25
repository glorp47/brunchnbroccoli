var React = require('react');
var FilterStore = require('../../stores/filterStore.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var RsvpStore = require('../../stores/rsvpStore.js');
var RsvpActions = require('../../actions/rsvpAction.js');
var FilterActions = require('../../actions/filterAction.js');


var ReservationDatesGuests = React.createClass({
  // mixins: [LinkedStateMixin],
  getInitialState: function() {
    // debugger;

    var dates = FilterStore.currentDates();
    return ({
      checkin: dates.checkin,
      checkout: dates.checkout,
      guests: FilterStore.currentGuests(),
      showResult: false
    });
  },

  updateResult: function() {
    this.setState({
      showResult: RsvpStore.isVerified()
    });
  },

  checkAvailability: function() {
    RsvpActions.checkAvailability(this.props.room.id);
  },

  updateInputCheckin: function(e) {
    this.setState({
      checkin: e.currentTarget.value,
      showResult: false
    });
  },

  updateInputCheckout: function(e) {
    this.setState({
      checkout: e.currentTarget.value,
      showResult: false
    });
  },

  updateCheckin: function(checkinDate) {
    this.setState({
      checkin: checkinDate,
      showResult: false
    });
    this.verifyAndUpdateDates();
  },


  updateCheckout: function(checkoutDate) {
    this.setState({
      checkout: checkoutDate,
      showResult: false
    });
    this.verifyAndUpdateDates();
  },

  verifyAndUpdateDates: function() {
    var checkin = this.state.checkin;
    var checkout = this.state.checkout;
    if (checkin !== null && checkout !== null && Date.parse(checkin) < Date.parse(checkout)){
      FilterActions.updateDates({
        checkin: checkin,
        checkout: checkout
      });
    }
  },



  // simple version, need to add beforeShowDay function to disable unavailable days
  loadDatePicker: function(checkin, checkout) {
    var _this = this;
    console.log("loadPicker");
    var defaultCheckin = _this.state.checkin || Date.now()
    $("#room-index-checkin").datepicker({
      minDate: "0",
      defaultDate: _this.state.checkin,
      dateFormat: 'mm/dd/yy',
      // defaultDate: '12/30/2015',
      onClose: function(checkinDate) {
        _this.updateCheckin(checkinDate);
      }
    });
    $("#room-index-checkout").datepicker({
      minDate: "0",
      defaultDate: _this.state.checkout,
      dateFormat: 'mm/dd/yy',
      onClose: function(checkoutDate) {
        _this.updateCheckout(checkoutDate);
      }
    });
  },


  componentWillUnmount: function() {
    this.filterStoreToken.remove();
    this.rsvpStoreToken.remove();
  },

  componentDidMount: function() {
    this.loadDatePicker();
    this.filterStoreToken = FilterStore.addListener(this.checkAvailability);
    this.rsvpStoreToken = RsvpStore.addListener(this.updateResult);
    this.verifyAndUpdateDates();
  },



  componentWillReceiveProps: function() {
    // this.loadDatePicker();
  },

  render: function() {
    var buildGuestOptions = function(n) {
      n = parseInt(n);
      var i = 1;
      var guestOptions = [];
      while(i <= n) {
        guestOptions.push(
          <option key={i + "options"} value={i}>{i + " Guest"}</option>
        );
        i++;
      }
      return guestOptions;
    };
    console.log("beforeloading")
    var result = "";
    if(this.state.showResult) {
      result = RsvpStore.isAvailable() ? "Available" : "Those dates are not available"
    }
    return (
      <form className="col-md-12">
        <div className="row row-condensed">
          <div className="col-sm-4 row-space-1-sm">
            <input
               name="checkin"
               id="room-index-checkin"
               type="text"
               autoComplete="off"
               className="ui-datepicker-target col-sm-12"
               placeholder="Check In"
               value={this.state.checkin}
               onChange={this.updateInputCheckin}/>
          </div>
          <div className="col-sm-4 row-space-1-sm">
            <input
               name="checkout"
               id="room-index-checkout"
               type="text"
               autoComplete="off"
               className="ui-datepicker-target col-sm-12"
               placeholder="Check Out"
               value={this.state.checkout}
               onChange={this.updateInputCheckout} />
          </div>
          <div className="col-sm-2">
            <select
               name="guests"
               id="room-index-guest-select"
               onChange={this.updateGuests}>
               {buildGuestOptions(this.props.room.max_guest_num)}
            </select>
          </div>
        </div>
        <div className="row">
          <p>{result}</p>
        </div>
      </form>
    );
  }
});

module.exports = ReservationDatesGuests;
