'use strict';

var request = require('axios');
var React = require('react');
var classSet = require('classnames');
var api = require('../api');

var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
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
  incomplete_number: "incomplete number",
  incorrect_number: "Kortin numero on virheellinen.",
  invalid_number: "Kortin numero on virheellinen.",
  invalid_expiry_month: "Kortin vanhenemiskuu on virheellinen.",
  invalid_expiry_year: "Kortin vanhenemisvuosi on virheellinen.",
  invalid_cvc: "Kortin CVC koodi on virheellinen.",
  expired_card: "Kortti on vanhentunut.",
  incorrect_cvc: "Kortin CVC koodi on virheellinen..",
  incorrect_zip: "The card's zip code failed validation.",
  card_declined: "Kortti hylättiin.",
  missing: "There is no card on a customer that is being charged.",
  processing_error: "Virhe kortin prosessoinnissa.",
  rate_limit:  "An error occurred due to requests hitting the API too quickly. Please let us know if you're consistently running into this error."
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

      // tää siirretään .theniin
      this.setState({
        sending: false,
      })

      this.props.onPaymentSuccess();
    } else if (result.error) {
      this.setState({
        error: stripeErrMessages[result.error.code] || result.error.message
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
      name: "My Name",
    };
    stripe.createToken(card, extraDetails).then(this.setOutcome);
  },

  render() {
    var formClasses = classSet({
      'form': true,
      'stripe-form': true,
      'has-error': this.state.error,
    });

    var feedbackMessage;

    if(this.state.error) {
      console.log(this.state.error);
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
        <button className='btn btn__submit' type='submit'>Maksa 10€</button>
      </form>
    )
  }
});
