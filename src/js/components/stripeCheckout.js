import request from 'axios';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import getAPIPath from '../api';
import getConfig from '../config';

const config = getConfig();

export default React.createClass({
  getInitialState() {
    return {
      error: null,
      sending: false
    };
  },

  onSubmit(token) {
    this.setState({
      error: null,
      sending: true
    });

    request.post(getAPIPath('membership'), {
      email: this.props.payerEmail,
      stripeToken: token.id
    })
    .then(() => {
      this.setState({
        sending: false
      });
      this.props.onPaymentSuccess();
    })
    .catch((e) => {
      this.setState({
        error: e,
        sending: false
      });
    });
  },

  render() {
    if (this.state.error) {
      return <p>Virhe maksaessa! Ota yhteyttä info@koodiklinikka.fi</p>;
    }

    if (this.state.sending) {
      return <img src="../images/ajax-loader.gif" alt="Odota hetki..." height="42" width="42"></img>;
    }

    return (
      <StripeCheckout
        amount={1000}
        currency="EUR"
        description="Jäsenmaksu"
        email={this.props.userInfo.email}
        image="https://avatars3.githubusercontent.com/u/10520119?v=3&s=200"
        locale="en"
        name="Koodiklinikka ry"
        stripeKey={ config.stripe.publicKey }
        token={ this.onSubmit }>
        <button className="btn btn-primary">
          Maksa kortilla
        </button>
      </StripeCheckout>
    );
  }
});
