'use strict';

var request = require('axios');
var React = require('react');
var classSet = require('classnames');
var api = require('../api');
import StripeCheckout from 'react-stripe-checkout';

var stripeErrMessages = {
  incomplete_number: "Kortin numero on virheellinen.",
  incorrect_number: "Kortin numero on virheellinen.",
  invalid_number: "Kortin numero on virheellinen.",
  incomplete_expiry: "Kortin vanhenemisaika on virheellinen.",
  invalid_expiry_month: "Kortin vanhenemiskuu on virheellinen.",
  invalid_expiry_year: "Kortin vanhenemisvuosi on virheellinen.",
  invalid_cvc: "Kortin CVC koodi on virheellinen.",
  incomplete_cvc: "Kortin CVC koodi on virheellinen.",
  expired_card: "Kortti on vanhentunut.",
  incorrect_cvc: "Kortin CVC koodi on virheellinen..",
  incomplete_zip: "Virheellinen postinumero.",
  incorrect_zip: "Virheellinen postinumero.",
  card_declined: "Kortti hylättiin.",
  missing: "There is no card on a customer that is being charged.",
  processing_error: "Virhe kortin prosessoinnissa.",
  rate_limit:  "Rajapintaan tehty liian monta kutsua. Odota hetki."
};

module.exports = React.createClass({
  getInitialState() {
    return {
      sending: false,
      error: null
    };
  },

  onSubmit(token) {
    this.setState({
      error: null,
      sending: true
    });

    request.post(api('membership'), {
      stripeToken: token.id,
      email: this.props.payerEmail
    })
    .then(() => {
      this.setState({
        sending: false
      });
      this.props.onPaymentSuccess();
    })
    .catch((e) => {
      this.setState({
        sending: false,
        error: e
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
        amount      = {1000}
        currency    = 'EUR'
        description = 'Jäsenmaksu'
        email       = {this.props.userInfo.email}
        image       = 'https://avatars3.githubusercontent.com/u/10520119?v = 3&s = 200'
        locale      = "en"
        name        = 'Koodiklinikka ry'
        stripeKey   = 'pk_test_OmNve9H1OuORlmD4rblpjgzh'
        token       = {this.onSubmit}
      >
        <button className="btn btn-primary">
          Maksa kortilla
        </button>
      </StripeCheckout>)
    }
  }
});
