var React = require('react');
var TripStore = require('../../stores/tripStore.js');
var TripListItem = require('./tripListItem.jsx');


var TripList = React.createClass({
  getInitialState: function() {
    return({
      trips: this.props.trips,
      tabName: this.props.tabName,
      activeTripId: null
    });
  },

  highlightTripId: function(tripId) {
    this.setState({
      activeTripId: tripId
    });
  },

  componentWillReceiveProps: function(newProps) {
    console.log(newProps);

    this.setState({
      trips: newProps.trips,
      tabName: newProps.tabName
    });
  },

  render: function() {
    var trips = this.state.trips;
    var trip;
    var className = "list-group-item";
    var classNameActive = "list-group-item active"
    var _this = this;
    var listItems = Object.keys(trips).map(function(tripId) {
      trip = trips[tripId];
      return(
        <TripListItem
          key={tripId}
          trip={trip}
          activeTripId={_this.state.activeTripId}
          history={_this.props.history}
          highlightTripId={_this.highlightTripId}
          />
      );
    });
    // debugger;

    return (
      <div className="panel panel-success">
        <div className="panel-heading">
          {this.state.tabName}
          <span className="badge pull-right">
            {listItems.length}
          </span>
        </div>
        <div className="list-group">
          {listItems}
        </div>
      </div>
    );
  }

});

module.exports = TripList;
