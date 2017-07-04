'use strict';

var request = require('axios');
var React = require('react');
var classSet = require('classnames');

var StripeCheckout = require('./stripeCheckout.js');
var MembershipInfoForm = require('./membershipInfoForm.js');

module.exports = React.createClass({
  getInitialState() {
    return {
      userInfo: null,
      infoFormSuccess: false,
      paymentSuccess: false
    };
  },

  handlePaymentSuccess() {
    this.setState({paymentSuccess: true});
  },

  handleInfoFormSuccess(userInfo) {
    this.setState({
      userInfo: userInfo,
      infoFormSuccess: true,
    });
  },

  render() {
    if(!this.state.infoFormSuccess) {
      return <MembershipInfoForm onSuccess={this.handleInfoFormSuccess}></MembershipInfoForm>

    } else if (!this.state.paymentSuccess) {
      return (
        <StripeCheckout
          payerName={this.state.userInfo.name}
          onPaymentSuccess={this.handlePaymentSuccess}>
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
