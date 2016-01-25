var React = require('react');
var ReactRouter = require('react-router');
var RoomStore = require('../stores/roomStore.js');
var FilterStore = require('../stores/filterStore.js');
var RoomActions = require('../actions/roomAction.js');
var FilterActions = require('../actions/filterAction.js')


var List = require('./searchIndexComponents/list.jsx');
var Map = require('./searchIndexComponents/map.jsx');
var SearchForm = require('./searchIndexComponents/searchForm.jsx');
var JSLoaderStore = require('../stores/jsLoaderStore.js');
var LoadingScreen = require('./loadingScreen.jsx');



var SearchIndex = React.createClass({
  // mixins: [ReactRouter.history],

  getInitialState: function() {
    return({
      rooms: RoomStore.all(),
      // filterParams: FilterStore.params(),
      // showResult: JSLoaderStore.isReady('gMaps')
      showResult: false
    });
  },


  _updateRooms: function() {
    this.setState({
      rooms: RoomStore.all()
    });
    // debugger;
  },

  _updateFilter: function() {
    // console.log("updatefilter");
    // this.setState({
    //   filterParams: FilterStore.params()
    // });
    RoomActions.fetchFilteredRooms();
  },

  _updateMapsStatus: function() {
    if (JSLoaderStore.isReady('gMaps')) {
      // no need to receive further GMapsLib loading status as already loaded.
      this.mapsReadyToken.remove();
      this._startSearchProcess();
    }
  },

  _startSearchProcess: function() {
    this.geocoder = new google.maps.Geocoder();
    this._geoConverter(this.props.params.loc);
  },


  _geoConverter: function(locStr) {
    // console.log("geoConverter called");
    var _showMaps = this._showMaps;
    this.geocoder.geocode({"address": locStr}, function(results, status){
      if (status === google.maps.GeocoderStatus.OK) {
        // this will be used as the center of google maps
        var latLng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        // console.log(latLng);
        _showMaps(latLng);
      } else {
        // here to handle failed search
        // console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  },

  _showMaps: function(centerLatLng) {
    this.setState({
      showResult: true,
      centerLatLng: centerLatLng
    });
  },

  componentWillReceiveProps: function(newProps) {
    var newLocStr = newProps.params.loc;
    // console.log("searchIndexReceivedNewProps" + newLocStr);
    // debugger;
    // if the new loc string is the same, do nothing
    // if (this.currentLocStr !== newLocStr) {
      this._geoConverter(newProps.params.loc);
    // }
  },

  componentWillUnmount: function() {
    this.roomToken.remove();
    this.filterToken.remove();
  },

  componentDidMount: function() {
    this.currentLocStr = this.props.params.loc;
    // console.log('searchIndexmounted' + this.currentLocStr);
    // run map-related search immediately if GMapsLib is loaded,
    // or listen to change of loading status from the JSLoaderStore
    if (JSLoaderStore.isReady('gMaps')) {
      this._startSearchProcess();
    } else {
      this.mapsReadyToken = JSLoaderStore.addListener(this._updateMapsStatus);
    }
    this.roomToken = RoomStore.addListener(this._updateRooms);
    this.filterToken = FilterStore.addListener(this._updateFilter);

    // RoomActions.fetchCurrentMapRooms();
  },

  render: function() {

    var showResult = this.state.showResult;
    // // For testing
    // showResult = false;
    // console.log(this.props.params.loc);
    // // For testing

    if (showResult) {
      // console.log("searchIndexRendered");
      return (
        <div className="container-fluid below-nav" id="sidx">
          <div className="col-md-5 search-map hidden-xs">
              <Map centerLatLng={this.state.centerLatLng}/>
            </div>
          <div className="col-xs-12 col-md-7 search-result" id="sidx-left">
            <div className="row">
              <h2 style={{display: "none"}}>Search Filter Placeholder</h2>
              <SearchForm />
            </div>
            <div className="row search-list-result" >
              <h2 style={{display: "none"}}>Search Result Header Placeholder</h2>
              <List rooms={this.state.rooms} history={this.props.history} />
            </div>
          </div>

        </div>
      );
    } else {
      return(
        <LoadingScreen />
      );
    }
  }
});

module.exports = SearchIndex;
