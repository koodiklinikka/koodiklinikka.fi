'use strict';

var request = require('axios');
var React = require('react');
var classSet = require('classnames');
var api = require('../api');

// create config for this
var stripe = Stripe('pk_test_OmNve9H1OuORlmD4rblpjgzh');

var elements = stripe.elements();
var card = elements.create('card', {
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
  }
});

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

  componentDidMount: function() {
    card.mount('#card-element');
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
    stripe.createToken(card, extraDetails).then(this.setOutcome);
  },

  render() {
    var formClasses = classSet({
      'form': true,
      'stripe-form': true,
      'has-error': this.state.error,
      'sending': this.state.sending
    });

    var feedbackMessage;

    if(this.state.error) {
      feedbackMessage = (
        <div className='form--message'>
          {this.state.error}
        </div>
      );
    }

    return (
      <form className={formClasses} onSubmit={this.onSubmit}>
        {feedbackMessage}
        <span className='name'>{this.props.payerName}</span>
        <div id='card-element'></div>
        <button className='btn btn__submit' type='submit'>Maksa 15€</button>
        <span
          className='loader'>
        </span>
      </form>
    )
  }
});
