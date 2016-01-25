var React = require('react');
// var Modal = require('react-bootstrap').Modal;
// var FilterStore = require('../../stores/filterStore.js');
// var FilterActions = require('../../actions/filterAction.js');

var ReservationDatesGuests = require('./reservationDatesGuests.jsx');
var ReservationUpcomingTrips = require('./reservationUpcomingTrips.jsx');
var Pricing = require('./pricing.jsx');
var ReservationButton = require('./reservationButton.jsx');
var ReservationToggleButton = require('./reservationToggleButton.jsx');
var ReservationReviewModal = require('./reservationReviewModal.jsx');
var ReservationConfModal = require('./reservationConfModal.jsx');
var ReservationMap = require('./reservationMap.jsx');

var TripStore = require('../../stores/tripStore.js');
var TripActions = require('../../actions/tripAction.js');
var QueryActions = require('../../actions/queryAction.js')



var ReservationTab = React.createClass({
  getInitialState: function() {
    var room = this.props.room;
    var upcomingTrips = TripStore.upcomingTripsWithRoom(room.id);
    return ({
      room: room,
      showUpcomingTrips: Object.keys(upcomingTrips).length > 0,
      upcomingTrips: upcomingTrips,
      showReviewModal: false,
      showConfModal: false
    });
  },

  openReviewModal: function() {
    this.setState({
      showReviewModal: true
    });
  },

  handleTripStoreUpdates: function() {
    if(TripStore.hasNewConf()) {
      setTimeout(this.openConfModal, 1000);
      this.closeModal();
    }
    var upcomingTrips = TripStore.upcomingTripsWithRoom(this.state.room.id);
    this.setState({
      upcomingTrips: upcomingTrips,
      showUpcomingTrips: Object.keys(upcomingTrips).length > 0
    });
  },

  openConfModal: function() {
    // clear querystore when a new booking is submitted
    QueryActions.resetQuery();
    this.setState({
      upcomingTrips: TripStore.upcomingTripsWithRoom(this.state.room.id),
      showUpcomingTrips: true,
      showConfModal: true
    });
  },

  closeModal: function() {
    this.setState({
      showReviewModal: false,
      showConfModal: false
      // showReviewModal: false,
      // modalTitle: ""
    });
  },

  submitReservation: function(message) {
    TripActions.submitReservation(message);
  },

  showConfirmation: function() {
    // debugger;
    // window.openConfModal = this.openConfModal;
    setTimeout(this.openConfModal, 1000);
    this.closeModal();
  },

  hideUpcomingTrips: function() {
    this.setState({
      showUpcomingTrips: false
    })
  },


  componentWillReceiveProps: function(newProps) {
    // debugger;
    var upcomingTrips = TripStore.upcomingTripsWithRoom(newProps.room.id);
    this.setState({
      room: newProps.room,
      upcomingTrips: upcomingTrips,
      showUpcomingTrips: Object.keys(upcomingTrips).length > 0,
      showReviewModal: false,
      showConfModal: false
    });
  },

  componentDidMount: function() {
    this.tripToken = TripStore.addListener(this.handleTripStoreUpdates);
  },

  componentWillUnmount: function() {
    this.tripToken.remove();
  },




  render: function() {
    console.log(this.state.showUpcomingTrips);
    // debugger;
    var pricePerNight = this.state.room.price;
    // console.log("reservation renders")
    return(
      <div className="col-md-4 rsvp-tab">
        <div className="row rsvp-ppn">
          <h3>{"$" + pricePerNight + " Per Night"}</h3>
        </div>
        <div
           className="row rsvp-params bg-light-green">
           { this.state.showUpcomingTrips ?
               (<ReservationUpcomingTrips trips={this.state.upcomingTrips} />) :
               (<ReservationDatesGuests room={this.state.room} />) }

        </div>
        <div className="row rsvp-calc bg-light-green">
          <Pricing room={this.state.room} />
        </div>
        <div className="row rsvp-button bg-light-green">
          { this.state.showUpcomingTrips ?
              (<ReservationToggleButton
                  hideUpcomingTrips={this.hideUpcomingTrips} />) :
              (<ReservationButton
                  openModal={this.openReviewModal}/>) }
        </div>
        <div className="row rsvp-map bg-light-green">
          <ReservationMap room={this.state.room} />
        </div>


        <ReservationReviewModal
          {...this.props}
          submitReservation={this.submitReservation}
          show={this.state.showReviewModal}
          onHide={this.closeModal}>
        </ReservationReviewModal>

        <ReservationConfModal
          {...this.props}
          room={this.state.room}
          trip={TripStore.newTrip()}
          show={this.state.showConfModal}
          onHide={this.closeModal}>
        </ReservationConfModal>
      </div>
    );
  }
});

module.exports = ReservationTab;
