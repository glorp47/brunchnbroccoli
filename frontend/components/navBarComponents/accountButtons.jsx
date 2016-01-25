var React = require('react');
var SessionActions = require('../../actions/sessionAction.js');
var Modal = require('react-bootstrap').Modal;

var AccountButtons = React.createClass({



  handleLogOut: function(e) {
    e.preventDefault();
    this.props.history.pushState(null, '/');
    // setTimeout(this.props.history.pushState(null, '/'), 500);
    // use waitFor in stores to clear user data from the stores in order
    SessionActions.logOut();
  },

  render: function() {
    var userProfile = this.props.currentUser.user_profile;
    var hasProfilePic = userProfile.profile_pic_url !== null;
    // debugger;
    var profilePicUrl =  userProfile.profile_pic_url;
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li className='dropdown'>
          <a
             className='dropdown-toggle'
             data-toggle='dropdown'
             role='button'
             aria-haspopup='true'
             aria-expanded='false'
             style={hasProfilePic ? {paddingTop:"5px", paddingBottom:"5px"} : {}}>
              {userProfile.fname + " "}
              {hasProfilePic ? (<img
                className="img-circle"
                width="35px"
                height="35px"
                src={profilePicUrl} />) : ""}
            <span className='caret'></span>
          </a>
          <ul className='dropdown-menu'>
            <li onClick={this.handleLogOut}><a href="#">
              Log Out
            </a></li>
          </ul>
        </li>
      </ul>
    );
  }
});

module.exports = AccountButtons;
