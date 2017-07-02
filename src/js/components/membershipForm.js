'use strict';

var request = require('axios');
var React = require('react');
var classSet = require('classnames');

var api = require('../api');

var StripeCheckout = require('./stripeCheckout.js');

module.exports = React.createClass({
  getInitialState() {
    return {
      email: '',
      name: '',
      handle: '',
      residence: '',
      submitted: false,
      sending: false,
      error: null,
      infoFormSuccess: false,
      paymentSuccess: false
    };
  },
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      submitted: false,
      sending: true,
      error: null
    });

    this.handleInfoFormSuccess();
  },
  handleInfoFormSuccess() {
    this.setState({submitted: true, sending: false, infoFormSuccess: true});
  },
  handleError(err) {
    this.setState({error: err, sending: false});
  },
  onChange(e) {
    if(e.target.value === this.state[e.target.name]) {
      return;
    }

    this.setState({
      [e.target.name]: e.target.value,
      error: null,
      submitted: false
    });
  },
  handlePaymentSuccess() {
    this.setState({paymentSuccess: true})
  },
  render() {
    var formClasses = classSet({
      'form': true,
      'membership-form': true,
      'has-success': this.state.submitted,
      'has-error': this.state.error,
      'sending': this.state.sending
    });

    var inputClasses = classSet({
      'input': true,
      'has-success': this.state.submitted,
      'has-error': this.state.error
    });

    var feedbackMessage;

    if(this.state.error || this.state.submitted) {
      let messageText;

      if(this.state.submitted) {
        messageText = 'Kutsu lähetetty antamaasi sähköpostiosoitteeseen.';
      } else if(this.state.error.status === 400 && this.state.error.data === 'invalid_email') {
        messageText = 'Tarkasta syöttämäsi sähköpostiosoite';
      } else if(this.state.error.status === 400 && this.state.error.data === 'already_invited') {
        messageText = 'Sähköpostiosoitteeseen on jo lähetetty kutsu';
      } else {
        messageText = 'Jotain meni pieleen. Yritä hetken päästä uudelleen.';
      }

      feedbackMessage = (
        <div className='form--message'>
          {messageText}
        </div>
      );
    }

    if(!this.state.infoFormSuccess) {
      return (
        <div>
          <form className={formClasses} onSubmit={this.onSubmit}>
            {feedbackMessage}
            <input
              className={inputClasses}
              type='text'
              name='email'
              placeholder='Sähköposti'
              value={this.state.email}
              onChange={this.onChange} />
            <input
              className={inputClasses}
              type='text'
              name='name'
              placeholder='Koko nimi'
              value={this.state.name}
              onChange={this.onChange} />
            <input
              className={inputClasses}
              type='text'
              name='handle'
              placeholder='Slack-käyttäjätunnus'
              value={this.state.handle}
              onChange={this.onChange} />
            <input
              className={inputClasses}
              type='text'
              name='residence'
              placeholder='Paikkakunta'
              value={this.state.residence}
              onChange={this.onChange} />
            <button
              className='btn btn__submit'
              type='submit'
              title='Lähetä'
              disabled={this.state.error || this.state.submitted}>
              Siirry maksamaan
            </button>
            <span
              className='loader'>
            </span>
          </form>
        </div>
      )
    } else if (this.state.infoFormSuccess && !this.state.paymentSuccess) {
      return (
        <div>
          <StripeCheckout payerName={this.state.name} onPaymentSuccess={this.handlePaymentSuccess}></StripeCheckout>
        </div>
      )
    } else {
      return (
        <p> Onnee!
        </p>
      )
    }
  }
});
