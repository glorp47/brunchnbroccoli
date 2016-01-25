var React = require('react');


var LoadingScreen = React.createClass({
  render: function() {
    return (
      <div className="loading-screen">
        <h1>Your Pages is being loaded!</h1>
      </div>
    );
  }
});

module.exports = LoadingScreen;
