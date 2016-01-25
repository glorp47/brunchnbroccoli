var React = require('react');
var FilterStore = require('../../stores/filterStore.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

// var RsvpStore = require('../../stores/rsvpStore.js');
// var RsvpActions = require('../../actions/rsvpAction.js');

var QueryStore = require('../../stores/queryStore.js');
var QueryActions = require('../../actions/queryAction.js');
var FilterActions = require('../../actions/filterAction.js');
var DateTools = require('../../helpers/date.js');


var ReservationDatesGuests = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    // debugger;

    var dates = FilterStore.currentDates();
    return ({
      checkin: dates.checkin,
      checkout: dates.checkout,
      dateRange: (dates.checkin === null ? "" : dates.checkin + " - " + dates.checkout),
      guests: FilterStore.currentGuests(),
      showResult: false,
      disableInput: false
    });
  },

  receiveResult: function() {
    this.setState({
      disableInput: false,
      showResult: QueryStore.isVerified()
    });
  },

  checkAvailability: function() {
    if (FilterStore.hasDates()) {
      QueryActions.checkAvailability(this.props.room.id);
    }
    // var newGuests = FilterStore.currentGuests();
    // if (this.state.guests !== newGuests) {
    //   this.setState({
    //     guests: newGuests
    //   })
    // } else if (FilterStore.hasDates()) {
    //   QueryActions.checkAvailability(this.props.room.id);
    // }
    // this.setState({
    //   disableInput: true
    // });
  },

  updateGuests: function(newGuests) {
    FilterActions.updateGuests(newGuests);
    this.setState({
      guests: newGuests
    });
  },


  loadDateRangePicker: function() {
    var minDate = DateTools.todayStr();
    var maxDate = DateTools.yearsAfterDateStr(3, minDate);
    var inputDomNode = this.refs.roomDateRangeInput;
    var _this = this;
    var dateRangeOptions = {
      "autoApply": true,
      "opens": "left",
      "showDropdowns": true,
      "minDate": minDate,
      "maxDate": maxDate,
      "autoUpdateInput": false
    }
    if(this.state.dateRange !== "") {
      dateRangeOptions.autoUpdateInput = true;
      dateRangeOptions.startDate = this.state.checkin;
      dateRangeOptions.endDate = this.state.checkout;
    }

    $(inputDomNode).daterangepicker(dateRangeOptions);

    $(inputDomNode).on('hide.daterangepicker', function(ev, picker) {
      console.log('hide')
      var checkin = picker.startDate.format('MM/DD/YYYY');
      var checkout = picker.endDate.format('MM/DD/YYYY');
      var momentToday = moment().startOf('day');
      var validInput = ( moment(checkin, "MM-DD-YYYY").diff(momentToday) >= 0
                        && moment(checkout, "MM-DD-YYYY").diff(momentToday) > 0
                        && moment(checkout, "MM-DD-YYYY").diff(moment(checkin, "MM-DD-YYYY")) > 0
                      );
      if (validInput) {
        _this.updateFilterParams(checkin, checkout);
        _this.updateDateRangeInput(checkin, checkout);
      } else {
        console.log('invalid');
        _this.dateRange = "";
        // debugger;
        $(_this.refs.roomDateRangeInput).data('daterangepicker').autoUpdateInput = false;
        $(_this.refs.roomDateRangeInput).val("");
        FilterActions.resetDates();
        QueryActions.resetQuery();
      }
    });
  },

  updateFilterParams: function(checkin, checkout) {
    FilterActions.updateDates({
      checkin: checkin,
      checkout: checkout
    });
  },

  updateDateRangeInput: function(checkin, checkout) {
    console.log(checkin + checkout);
    $(this.refs.roomDateRangeInput).data('daterangepicker').autoUpdateInput = true;
    $(this.refs.roomDateRangeInput).data('daterangepicker').setStartDate(checkin);
    $(this.refs.roomDateRangeInput).data('daterangepicker').setEndDate(checkout);
    this.dateRange = checkin + " - " + checkout;
    this.setState({
      checkin: checkin,
      checkout: checkout,
      disableInput: true
    });
  },


  componentWillUnmount: function() {
    // console.log("calendar unmounted")
    this.filterStoreToken.remove();
    this.QueryStoreToken.remove();
  },

  componentDidMount: function() {
    this.loadDateRangePicker();
    this.filterStoreToken = FilterStore.addListener(this.checkAvailability);
    this.QueryStoreToken = QueryStore.addListener(this.receiveResult);
    this.checkAvailability();
  },


  // fixed! need to fix the issue: when params.roomId changes, checkin-checkout values will not be displayed


  render: function() {
    // console.log("rsvpDG renders")
    var guestsValueLink = {
      value: this.state.guests,
      requestChange: this.updateGuests
    };

    var buildGuestOptions = function(n) {
      n = parseInt(n);
      var i = 1;
      var guestOptions = [];
      while(i <= n) {
        guestOptions.push(
          <option key={i + "options"} value={i.toString()}>{i + (i > 1 ? " Guests" : " Guest")}</option>
        );
        i++;
      }
      return guestOptions;
    };
    // console.log("beforeloading")
    var result = "";
    if(this.state.showResult) {
      // result = QueryStore.isAvailable() ? "Available" : "Those dates are not available"
      result = QueryStore.isAvailable() ? "" : "Those dates are not available"
    }

    // var dateRange = this.state.checkin + " - " + this.state.checkout;
    // if (this.state.checkin)
    return (
      <div className="container-fluid col-xs-12">
        <div className="row row-condensed">
          <div className="col-sm-9 row-space-1-sm">
            <h5 style={{textAlign:"center"}}>
              {this.state.checkin === null ? "" : "Check In - Check Out"}
            </h5>
          </div>
        </div>
        <div className="row row-condensed">
          <div className="col-md-offset-0 col-md-8 col-xs-offset-1 col-xs-10 md-no-right-padding">
            <input
               name="daterange"
               id="room-index-daterange"
               ref="roomDateRangeInput"
               type="text"
               autoComplete="off"
               className="form-control"
               placeholder="Check In - Check Out"
               disabled={this.state.disableInput}
               value={this.dateRange}
               style={{textAlign:"center"}}/>
          </div>
          <div className="col-md-offset-0 col-md-4 col-xs-offset-1 col-xs-10 md-no-left-padding">
            <select
               name="guests"
               id="room-index-guest-select"
               className="form-control"
               valueLink={guestsValueLink}
               style={{textAlign:"center"}}>
               {buildGuestOptions(this.props.room.max_guest_num)}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-offset-1 col-xs-10">
            <p>{result}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ReservationDatesGuests;
