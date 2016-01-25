var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionActions = require('../../actions/sessionAction.js');


var SignUpForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return ({
      username: "",
      password: "",
      passwordConfirmation: "",
      fname: "",
      lname: "",
      errors: []
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    // this.props.closeModal();
    this.errors = [];
    this.validatePassword();

    if (this.errors.length > 0){
      this.setState({
        errors: this.errors
      });
    } else {
      SessionActions.signUp({
        username: this.state.username,
        password: this.state.password,
        user_profile_attributes: {
          fname: this.state.fname,
          lname: this.state.lname
        }
      });
    }
  },

  validatePassword: function() {
    var password = this.state.password;
    var passwordConfirmation = this.state.passwordConfirmation
    if (password.length < 6){
      this.errors.push("Password length too short (minimum: 6 characters)!");
    }
    if (password !== passwordConfirmation) {
      this.errors.push("Password confirmation and Password must match!");
    }
  },

  resize: function() {
  // resize modal
  $(".modal-dialog").addClass("user-modal");

  },

  componentDidMount: function() {
    this.resize();
  },


  render: function() {
    var alert = this.state.errors.map(function(error, idx){
        return (
          <div
            key={"error"+idx}
            className="alert alert-danger"
            role="alert">
            <strong>{error}</strong>
          </div>
        );
      });
    return(
      <form className='form-signup modal-form' onSubmit={this.handleSubmit}>
        {alert}
        <div className="input-group input-group-lg">
            <input
                type="email"
                id="inputEmail"
                className="form-control"
                valueLink={this.linkState("username")}
                placeholder='Email Address'
                required
            />
        </div>

        <div className="input-group input-group-lg">
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              valueLink={this.linkState("password")}
              placeholder='Password'
              required
              />
            <input
              type="password"
              id="passwordConfirmation"
              className="form-control"
              valueLink={this.linkState("passwordConfirmation")}
              placeholder='Confirm Password'
              required
              />
        </div>
        <div className="input-group input-group-lg">
          <input
            type="text"
            id="inputFname"
            className="form-control"
            valueLink={this.linkState("fname")}
            placeholder='First Name'
            required
            />
          <input
            type="text"
            id="inputLname"
            className="form-control"
            valueLink={this.linkState("lname")}
            placeholder='Last Name'
            required
            />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" value="agreement" required></input>
             I agree to the terms and conditions.
          </label>
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit">
          Sign Up
        </button>
      </form>
    );
  }
});

module.exports = SignUpForm;
