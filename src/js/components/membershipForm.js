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
        <svg height='50' width='50' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='#349c4a'
            d='M256 6.998c-137.533 0-249 111.467-249 249 0 137.534 111.467 249 249 249s249-111.467 249-249c0-137.534-111.467-249-249-249zm0 478.08c-126.31 0-229.08-102.77-229.08-229.08 0-126.31 102.77-229.08 229.08-229.08 126.31 0 229.08 102.77 229.08 229.08 0 126.31-102.77 229.08-229.08 229.08z' />
          <path
            fill='#349c4a'
            d='M384.235 158.192L216.92 325.518 127.86 236.48l-14.142 14.144 103.2 103.18 181.36-181.47' />
        </svg>
        <p> Maksu ja rekisteröityminen onnistui.</p>
        <p> Tervetuloa Koodiklinikka ry:n jäseneksi!</p>
      </div>
    );
  }
});
