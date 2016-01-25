var React = require('react');
var SessionStore = require('../../stores/sessionStore.js');
var QueryStore = require('../../stores/queryStore.js');


var ReservationButton = React.createClass({
  getInitialState: function() {
    return({
      loggedIn: SessionStore.hasCurrentUser(),
      verifiedDates: QueryStore.isAvailable()
    });
  },

  updateAvail: function() {
    this.setState({
      verifiedDates: QueryStore.isAvailable()
    });
  },
  updateLoginStatus: function() {
    this.setState({
      loggedIn: SessionStore.hasCurrentUser()
    });
  },

  openCalendar: function() {
    document.getElementById('room-index-daterange').focus();
  },
  openLogin: function() {
    document.getElementsByClassName('login')[0].click();
  },

  componentWillUnmount: function() {
    this.buttonSessionToken.remove();
    this.buttonRsvpToken.remove();
  },

  componentDidMount: function() {
    this.buttonSessionToken = SessionStore.addListener(this.updateLoginStatus);
    this.buttonRsvpToken = QueryStore.addListener(this.updateAvail);
  },

  render: function() {
    // debugger;
    var buttons = {
      login: (
        <button
          type="button"
          className="btn btn-lg btn-primary center-block"
          onClick={this.openLogin}
          style={{minWidth: "100%"}}>
          Login to book
        </button>
      ),
      selectDates: (
        <button
          type="button"
          className="btn btn-lg btn-info center-block"
          onClick={this.openCalendar}
          style={{minWidth: "100%"}}>
          Select Dates
        </button>
      ),
      request: (
        <button
          type="button"
          className="btn btn-lg btn-success center-block"
          style={{minWidth: "100%"}}
          onClick={this.props.openModal}>
          Request to book
        </button>
      )
    };
    var selection;
    if(this.state.loggedIn && this.state.verifiedDates) {
      selection = buttons.request;
    } else if(!this.state.verifiedDates) {
      selection = buttons.selectDates;
    } else {
      selection = buttons.login;
    }


    return (
      <div className="col-md-12 text-center">
        <div className="row">
          <div className="col-md-offset-2 col-md-8 col-xs-offset-1 col-xs-10">
            {selection}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ReservationButton;
