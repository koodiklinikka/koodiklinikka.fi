'use strict';

var request  = require('axios');
var React    = require('react');
var classSet = require('classnames');
import StripeCheckout from 'react-stripe-checkout';

var api      = require('../api');
var config   = require('../../config.js')();

module.exports = React.createClass({
  getInitialState() {
    return {
      error:   null,
      sending: false
    };
  },

  onSubmit(token) {
    this.setState({
      error:   null,
      sending: true
    });

    request.post(api('membership'), {
      email:       this.props.payerEmail,
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
      return <p>Virhe maksaessa! Ota yhteyttä info@koodiklinikka.fi</p>
    } else if (this.state.sending) {
      return <img src="../images/ajax-loader.gif" alt="Odota hetki..." height="42" width="42"></img>
    } else {
      return (<StripeCheckout
        amount      = { 1000 }
        currency    = 'EUR'
        description = 'Jäsenmaksu'
        email       = { this.props.userInfo.email }
        image       = 'https://avatars3.githubusercontent.com/u/10520119?v=3&s=200'
        locale      = "en"
        name        = 'Koodiklinikka ry'
        stripeKey   = { config.stripe.publicKey }
        token       = { this.onSubmit }
      >
        <button className="btn btn-primary">
          Maksa kortilla
        </button>
      </StripeCheckout>)
    }
  }
});
