import React from 'react';
import MembershipInfoForm from './membershipInfoForm';

module.exports = React.createClass({
  getInitialState() {
    return {
      paymentSuccess: false
    };
  },
  handlePaymentSuccess() {
    this.setState({ paymentSuccess: true });
  },
  render() {
    if(!this.state.paymentSuccess) {
      return (
        <MembershipInfoForm onPaymentSuccess={this.handlePaymentSuccess} />
      );
    }
    return (
      <div>
        <p> Maksu ja rekisteröityminen onnistui.</p>
        <p> Tervetuloa Koodiklinikka ry:n jäseneksi!</p>
      </div>
    );
  }
});
