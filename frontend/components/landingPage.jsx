var React = require('react');
var LandingSearchBar = require('./landingPageComponents/landingSearchBar.jsx');


var LandingPage = React.createClass({

  render: function() {
    return (
      <div className="jumbotron jumbotron-landing" id="landing-page">
        {/iPad|iPhone|iPod/.test(navigator.platform) ? "" : "" }
        <div className="container container-custom text-center" id="landing-text">
          <h1>TAKE A VACATION</h1>
          <h4>Go on a trip, see what happens!</h4>
        </div>
        <LandingSearchBar history={this.props.history}/>
      </div>
    );
  }
});

module.exports = LandingPage;
