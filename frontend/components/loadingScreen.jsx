var React = require('react');


var LoadingScreen = React.createClass({
  render: function() {
    return (
      <div className="loading-screen">
        <h1>Your Page is being loaded!</h1>
      </div>
    );
  }
});

module.exports = LoadingScreen;
