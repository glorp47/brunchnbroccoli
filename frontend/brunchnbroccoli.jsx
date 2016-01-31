var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Router = ReactRouter.Router;
var Redirect = ReactRouter.Redirect;

var SessionStore = require('./stores/sessionStore.js');

var LandingPage = require('./components/landingPage.jsx');
var NavBar = require('./components/navBar.jsx');
var SearchIndex = require('./components/searchIndex.jsx');
var RoomIndex = require('./components/roomIndex.jsx');
var UserIndex = require('./components/userIndex.jsx');
var TripIndex = require('./components/tripIndex.jsx');
var TripDetail = require('./components/tripComponents/tripDetail.jsx');


var JSLoaderAction = require('./actions/jsLoaderAction.js');


var App = React.createClass({

  render: function() {
    // var defaultApp = (
      // <div>
      //     <header><h1>TrekBnB</h1></header>
      //     {this.props.children}
      // </div>
    // );
    return (
      <div id="app">
        <NavBar history={this.props.history}/>
        {this.props.children}

      </div>
    );
  }
});

// var SearchRedirectToDefaultValue = React.createClass({
//   willTransitionTo: function(transition) {
//     transition.redirect('/search/san-francisco');
//   },
//   render: function() { return null; }
// });
var requireAuth = function(nextState, replaceState) {
  // need to fix async session check
  if(!SessionStore.hasCurrentUser()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/')
  }
};

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="/search/:loc" component={SearchIndex} />
    <Redirect path="/search" to="/search/san-francisco" />
    <Route path="rooms/:roomId" component={RoomIndex}></Route>
    <Route path="users/" component={UserIndex}></Route>
    <Route path="trips/" component={TripIndex} onEnter={requireAuth}>
      <Route path=":tripId" component={TripDetail} />
    </Route>
  </Route>
);

var checkLibStatus = function() {
  if (window.gMapsStatus) {
    JSLoaderAction.gMapsReady();
  } else {
    document.getElementById('gmapslib').addEventListener('load', JSLoaderAction.gMapsReady);
  }
}



document.addEventListener("DOMContentLoaded", function() {

  // Need to refactor [map loader]
  // window.googleMapsCallback = function() {
  //
  //   JSLoaderAction.gMapsReady();
  // };
  // JSLoaderAction.gMapsReady();
  checkLibStatus();

  // quick fix for turbolinks backnav problem with React http://bit.ly/1OyK9Pc
  // Turbolinks.pagesCached(0);

  var root = document.getElementById('root');
  ReactDOM.render(<Router>{routes}</Router>, root);
});
