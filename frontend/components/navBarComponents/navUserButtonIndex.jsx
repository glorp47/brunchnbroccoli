var React = require('react');
var SessionStore = require('../../stores/sessionStore.js');
var TripActions = require('../../actions/tripAction.js');
var Modal = require('react-bootstrap').Modal;
var SessionActions = require('../../actions/sessionAction.js');
var AccountButtons = require('./accountButtons.jsx');
var SignUpLoginButtons = require('./signUpLoginButtons.jsx');

var NavUserButtonIndex = React.createClass({
  getInitialState: function() {
    return ({
      currentUser: SessionStore.all()
      // preventRefresh: false
    });
  },

  _updateCurrentUser: function() {
    // if (preventRefresh === false){
      this.setState({
        currentUser: SessionStore.all()
      });
      if (SessionStore.hasCurrentUser()) {
        TripActions.fetchUserTrips();
      }
    // }
  },

  // refreshStop: function() {
  //   this.setState({
  //     preventRefresh: true
  //   });
  // },
  // refreshResume: function() {
  //   this.setState({
  //     currentUser: SessionStore.all(),
  //     preventRefresh: false
  //   });
  // },

  componentWillUnmount: function() {
    // debugger;
    this.nubiToken.remove();
  },

  componentDidMount: function() {
    this.nubiToken = SessionStore.addListener(this._updateCurrentUser);
    SessionActions.fetchSession();
  },

  render: function() {
    var ul;
    if (Object.keys(this.state.currentUser).length > 0) {
      ul = (<AccountButtons
                currentUser={this.state.currentUser}
                history={this.props.history}
            />);
    } else {
      ul = (<SignUpLoginButtons history={this.props.history}/>);
    }


    return (
      <div>
        {ul}
      </div>
    )
  }
});

module.exports = NavUserButtonIndex;
