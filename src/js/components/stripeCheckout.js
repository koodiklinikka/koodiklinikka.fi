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

  setOutcome(result) {
    if (result.token) {
      this.setState({
        error: null
      })

      request.post(api('membership'), {
        stripeToken: result.token.id,
        email: this.props.payerEmail
      })
      .then(() => {
        this.setState({
          sending: false
        });
        this.props.onPaymentSuccess();
      })
      .catch((e) => {
        //TODO :errorhandling
      });

    } else if (result.error) {
      console.log(result.error);
      this.setState({
        error: stripeErrMessages[result.error.code] || result.error.message,
        sending: false
      });
    }
  },

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      error: null,
      sending: true
    });

    var form = document.querySelector('form');
    var extraDetails = {
      name: this.props.payerName,
    };
  },

  onToken(t) {
    console.log(t);
  },

  render() {
    var feedbackMessage;

    if(this.state.error) {
      feedbackMessage = (
        <div className='form--message'>
          {this.state.error}
        </div>
      );
    }

    return (
      <StripeCheckout
        amount={1000}
        currency='EUR'
        description='Jäsenmaksu'
        image='https://avatars3.githubusercontent.com/u/10520119?v=3&s=200'
        name='Koodiklinikka ry'
        stripeKey='pk_test_OmNve9H1OuORlmD4rblpjgzh'
        token={this.onToken}
        locale="en"
      />
    )
  }
});
