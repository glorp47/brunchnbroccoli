var React = require('react');
var QueryStore = require('../../stores/queryStore.js');

// simple pricing component that will calculate cost locally
var Pricing = React.createClass({
  getInitialState: function() {
    return({
      ppn: this.props.room.price,
      showResult: QueryStore.isAvailable()
    });
  },

  updateAvail: function() {
    this.setState({
      showResult: QueryStore.isAvailable()
    })
  },

  componentWillReceiveProps: function(newProps) {
    // debugger;
    this.setState({
      ppn: newProps.room.price,
      showResult: QueryStore.isAvailable()
    });
  },


  componentWillUnmount: function() {
    this.rsvpToken.remove();
  },


  componentDidMount: function() {
    this.rsvpToken = QueryStore.addListener(this.updateAvail);
  },

  render: function() {
    if (this.state.showResult) {
      var ppn = this.state.ppn;
      var cleaningFee = 30;
      var serviceFee = 30;
      var taxesP = 0.1;
      // need to move to QueryStore
      var nights = QueryStore.nights();
      nightsStr = nights > 1 ? nights + " nights" : nights + " night";
      return (
        <div className="col-md-12" >
          <table className="table">
            <tbody>
              <tr>
                <td>
                  {"$" + ppn + " per night × " + nightsStr}
                </td>
                <td>
                  {"$" + ppn*nights}
                </td>
              </tr>
              <tr>
                <td>
                  Cleaning fee
                </td>
                <td>
                  {"$" + cleaningFee}
                </td>
              </tr>
              <tr>
                <td>
                  Service fee
                </td>
                <td>
                  {"$" + serviceFee}
                </td>
              </tr>
              <tr>
                <td>
                  Occupancy Taxes
                </td>
                <td>
                  {"$" + Math.floor(ppn*nights*taxesP)}
                </td>
              </tr>
              <tr>
                <td>
                  Total
                </td>
                <td>
                  {"$" + (ppn*nights + cleaningFee + serviceFee + Math.floor(ppn*nights*taxesP))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
});

module.exports = Pricing;
