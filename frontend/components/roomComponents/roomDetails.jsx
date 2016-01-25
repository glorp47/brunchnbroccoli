var React = require('react');

var RoomDetails = React.createClass({
  render: function() {
    var room = this.props.room;
    // debugger;
    return (
      <div
        className="col-md-6 col-md-offset-1 room-body">
        <div className="row">
          <div className="col-xs-12">
            <br />
            <p>
              {room.description}
            </p>
            <br />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 text-muted">
            <p>Details</p>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-xs-6">
                <p>{"Accommodates: "}
                  <strong>{room.max_guest_num}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Bed: "}
                  <strong>{room.bed_num}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Bath: "}
                  <strong>{"1"}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Bed type: "}
                  <strong>{"Real Bed"}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Property type: "}
                  <strong>{"House"}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Room type: "}
                  <strong>{room.type_string}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Bedroom: "}
                  <strong>{"1"}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-3 text-muted">
            <p>Prices</p>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-xs-6">
                <p>{"Cleaning fee: "}
                  <strong>{"$50"}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Weekly discount: "}
                  <strong>{"0%"}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Monthly discount: "}
                  <strong>{"0%"}</strong>
                </p>
              </div>
              <div className="col-xs-6">
                <p>{"Cancellation: "}
                  <strong>{"Flexible"}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-3 text-muted">
            <p>Availability</p>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-xs-6">
                <p><strong>3</strong> nights minimum stay</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = RoomDetails;
