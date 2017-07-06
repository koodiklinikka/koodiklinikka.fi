'use strict';

var classSet = require('classnames');
var React    = require('react');
var request  = require('axios');

var MembershipInfoForm = require('./membershipInfoForm.js');
var StripeCheckout     = require('./stripeCheckout.js');

module.exports = React.createClass({
  getInitialState() {
    return {
      infoFormSuccess: false,
      paymentSuccess:  false,
      userInfo:        null
    };
  },

  handlePaymentSuccess() {
    this.setState({ paymentSuccess: true });
  },

  handleInfoFormSuccess(userInfo) {
    this.setState({
      infoFormSuccess: true,
      userInfo:        userInfo
    });
  },

  render() {
    if(!this.state.infoFormSuccess) {
      return <MembershipInfoForm onSuccess={ this.handleInfoFormSuccess }></MembershipInfoForm>

    } else if (!this.state.paymentSuccess) {
      return (
        <StripeCheckout
          userInfo         = { this.state.userInfo }
          onPaymentSuccess = { this.handlePaymentSuccess }>
        </StripeCheckout>)

    } else {
      return (
        <div>
          <p> Maksu ja rekisteröityminen onnistui.</p>
          <p> Tervetuloa Koodiklinikka ry:n jäseneksi!</p>
        </div>
      )
    }
  }
});
