var React = require('react');

var ReservationToggleButton = React.createClass({

  render: function() {
    return (
      <div className="col-md-12 text-center">
        <div className="row">
          <div className="col-md-offset-2 col-md-8 col-xs-offset-1 col-xs-10">
            <button
              type="button"
              className="btn btn-lg btn-warning center-block"
              style={{minWidth: "100%"}}
              onClick={this.props.hideUpcomingTrips}>
              Book Another Stay
            </button>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ReservationToggleButton;
