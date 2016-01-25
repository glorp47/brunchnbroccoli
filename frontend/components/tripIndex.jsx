var React = require('react');
var SessionStore = require('../stores/sessionStore.js');
var TripStore = require('../stores/tripStore.js');
var TripAction = require('../actions/tripAction.js');

var TripList = require('./tripComponents/tripList.jsx');
var TripDetail = require('./tripComponents/tripDetail.jsx');

var TripIndex = React.createClass({
  getInitialState: function() {
    this.tabs = [
      "All Trips",
      "Current",
      "Upcoming",
      "Past"
    ];
    return({
      activeTabId: 0,
      activeTripId: null,
      trips: TripStore.all()
    });
  },

  receiveTrips: function() {
    // debugger;
    this.setState({
      trips: TripStore.all()
    });
  },

  toggleTab: function(e) {
    e.preventDefault();
    var clickedTabName = e.target.innerHTML;
    var clickedTabId = this.tabs.indexOf(clickedTabName);
    if (clickedTabId !== this.state.activeTabId) {
      this.setState({
        activeTabId: clickedTabId,
        trips: TripStore.getTripsInCategory(clickedTabName.toLowerCase())
      });
    }
  },

  componentWillUnmount: function() {
  //   this.sessionToken.remove();
    this.tripToken.remove();
  },

  showTripDetail: function(tripId) {
    this.setState({
      activeTripId: tripId
    })
  },

  componentWillReceiveProps: function(newProps) {
    // console.log(newProps);
    this.setState({
      activeTripId: newProps.params.tripId
    });
  },

  // componentWillMount: function() {
  //   // check login status; if not logged in, redirect to homepage
  //   // may change to a login page with redirection back to tripIndex upon successful login
  //   if(!SessionStore.hasCurrentUser()) {
  //     debugger;
  //     this.props.history.pushState(null, '/');
  //   }
  // },

  componentDidMount: function() {
  //   this.sessionToken = SessionStore.addListener(this.logoutRedirect);
  //   debugger;
    this.tripToken = TripStore.addListener(this.receiveTrips);
    TripAction.fetchUserTrips();
  },


  render: function() {
    var activeTabId = this.state.activeTabId;
    return (
      <div className="container-fluid below-nav fixed-full-screen" id="tidx">
        <div className="col-xs-1" style={{maxWidth:"70px"}}>
          <ul
            className="nav nav-tabs tabs-left sideways"
            onClick={this.toggleTab}>
            <li
              className={activeTabId === 0 ? "active" : ""}>
              <a>{this.tabs[0]}</a>
            </li>
            <li className={activeTabId === 1 ? "active" : ""}>
              <a>{this.tabs[1]}</a>
            </li>
            <li className={activeTabId === 2 ? "active" : ""}>
              <a>{this.tabs[2]}</a>
            </li>
            <li className={activeTabId === 3 ? "active" : ""}>
              <a>{this.tabs[3]}</a>
            </li>
          </ul>
        </div>
        <div className="col-xs-4 trip-list-panel">
          <div>
            <div>
              <TripList
                trips={this.state.trips}
                history={this.props.history}
                tabName={this.tabs[this.state.activeTabId]} />
            </div>
          </div>
        </div>
        <div className="col-xs-7 trip-detail-panel">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = TripIndex;
