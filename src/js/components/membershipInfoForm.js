'use strict';

var request = require('axios');
var React = require('react');
var classSet = require('classnames');

var api = require('../api');

var StripeCheckout = require('./stripeCheckout.js');

var fieldNameTranslations = {
  email: {fi: "Sähköpostiosoite"},
  name: {fi: "Koko nimi"},
  handle: {fi: "Slack-käyttäjätunnus"},
  residence: {fi: "Paikkakunta"}
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = React.createClass({

  getInitialState() {
    return {
      email: '',
      name: '',
      handle: '',
      residence: '',
      sending: false,
      errors: []
    };
  },
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      sending: true,
      errors: []
    });


    var userInfo = {
      email: this.state.email,
      name: this.state.name,
      handle: this.state.handle,
      residence: this.state.residence,
    }

    var userInfoErrors = this.getDataErrors();

    console.log(userInfoErrors);

    if(userInfoErrors.length){
      this.setState({
        sending: false,
        errors: userInfoErrors
      });
      console.log("errorei");
    } else {
      this.props.onSuccess(userInfo);
    }
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
      errors: []
    });
  },

  getDataErrors() {
    var foundErrors = [];

    if (!this.state.name)
      foundErrors.push({field: 'name', type: 'missing'});

    if (!this.state.email)
      foundErrors.push({field: 'email', type: 'missing'});
    else if(!validateEmail(this.state.email))
      foundErrors.push({field: 'email', type: 'invalid'});

    if (!this.state.handle)
      foundErrors.push({field: 'handle', type: 'missing'});

    if (!this.state.residence)
      foundErrors.push({field: 'residence', type: 'missing'});


    return foundErrors;
  },

  render() {
    var formClasses = classSet({
      'form': true,
      'membership-form': true,
      'has-error': this.state.errors.length,
      'sending': this.state.sending
    });

    var inputClasses = classSet({
      'input': true,
      'has-error': this.state.errors.length
    });

    var feedbackMessages = [];

    this.state.errors.forEach((err, i) => {
      var feedbackText;

      if(err.type == 'missing') {
        feedbackText = `${fieldNameTranslations[err.field].fi} on pakollinen.`
      } else if (err.type == 'invalid') {
        feedbackText = `${fieldNameTranslations[err.field].fi} on virheellinen.`
      }

      feedbackMessages.push((<div key={i} className='form--message'>{feedbackText}</div>))
    });

    return (
      <div>
        <form className={formClasses} onSubmit={this.onSubmit}>
          {feedbackMessages}
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
            name='email'
            placeholder='Sähköposti'
            value={this.state.email}
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
            disabled={this.state.errors.length || this.state.submitted}>
            Siirry maksamaan
          </button>
          <span
            className='loader'>
          </span>
        </form>
      </div>
    )
  }
});
