var React = require('react');

var ListItemImage = React.createClass({
  getInitialState: function() {
    return({
      photoIdx: 0,
      showLoading: true
    });
  },

  forwardPic: function() {
    this.setState({
      photoIdx: this.state.photoIdx + 1,
      showLoading: true
    });
  },

  backwardPic: function() {
    this.setState({
      photoIdx: this.state.photoIdx - 1,
      showLoading: true
    });
  },

  imageLoaded: function() {
    this.setState({
      showLoading: false
    });
  },

  render: function() {
    var photos = this.props.room.room_pics;
    var photoId = ((this.state.photoIdx % photos.length) + photos.length) % photos.length;
    console.log(photoId);
    // var img_url = "https://res.cloudinary.com/dz6em5lpq/image/upload/c_scale,w_600"
    var img_url = "https://res.cloudinary.com/dz6em5lpq/image/upload/c_scale,h_480/c_crop,g_center,h_480,w_640"
     + photos[photoId].pic_url;
    return (
      <div className="list-item-image">
        <div className="image-container">
          <img
            src={img_url}
            alt="/assets/rooms/51557_0.jpg"
            className="img-responsive list-image"
            onLoad={this.imageLoaded}>
          </img>
          <div className="image-loading-container" hidden={!this.state.showLoading}>
            <i className="fa fa-spinner fa-spin fa-3x"></i>
          </div>
        </div>
        <div className="control-container">
          <div className="control-left-container" onClick={this.backwardPic}>
            <i className="fa fa-chevron-left fa-3x"></i>
          </div>
          <div className="control-redirect-container" onClick={this.props.handleClick}>
          </div>
          <div className="control-right-container" onClick={this.forwardPic}>
            <i className="fa fa-chevron-right fa-3x"></i>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = ListItemImage;
