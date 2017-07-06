'use strict';

var _        = require('lodash');
var request  = require('axios');
var React    = require('react');
var classSet = require('classnames');

var api            = require('../api');
var StripeCheckout = require('./stripeCheckout.js');

var fieldNameTranslations = {
  email:     { fi: "Sähköpostiosoite" },
  name:      { fi: "Koko nimi "},
  handle:    { fi: "Slack-käyttäjätunnus "},
  residence: { fi: "Paikkakunta" }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = React.createClass({

  getInitialState() {
    return {
      email:     '',
      name:      '',
      handle:    '',
      residence: '',
      sending:   false,
      errors:    []
    };
  },
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      sending: true,
      errors: []
    });


    var userInfo = {
      email:     this.state.email,
      name:      this.state.name,
      handle:    this.state.handle,
      residence: this.state.residence,
    }

    var userInfoErrors = this.getDataErrors();

    if(userInfoErrors.length){
      this.setState({
        sending: false,
        errors:  userInfoErrors
      });
    } else {
      this.props.onSuccess(userInfo);
    }
  },
  handleError(err) {
    this.setState({ error: err, sending: false });
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
      foundErrors.push({ field: 'name', type: 'missing' });

    if (!this.state.email)
      foundErrors.push({ field: 'email', type: 'missing' });
    else if(!validateEmail(this.state.email))
      foundErrors.push({ field: 'email', type: 'invalid' });

    if (!this.state.handle)
      foundErrors.push({ field: 'handle', type: 'missing' });

    if (!this.state.residence)
      foundErrors.push({ field: 'residence', type: 'missing' });


    return foundErrors;
  },

  render() {
    var formClasses = classSet({
      'form':            true,
      'membership-form': true,
      'has-error':       this.state.errors.length,
      'sending':         this.state.sending
    });


    /* generate error messages */
    var feedbackMessages = [];
    var fieldsWithErrors = [];

    this.state.errors.forEach((err, i) => {
      var feedbackText;

      fieldsWithErrors.push(err.field);

      if(err.type == 'missing') {
        feedbackText = `${ fieldNameTranslations[err.field].fi } on pakollinen.`
      } else if (err.type == 'invalid') {
        feedbackText = `${ fieldNameTranslations[err.field].fi } on virheellinen.`
      }

      feedbackMessages.push((<div key={i} className='form--message'>{ feedbackText }</div>))
    });


    /* generate input fields */
    var fieldNames  = ['name', 'email', 'handle', 'residence'];
    var inputFields = [];

    fieldNames.forEach((fieldName) => {
      var inputClasses = classSet({
        'input': true,
        'has-error': _.includes(fieldsWithErrors, fieldName)
      });

      inputFields.push((
        <input
          key         = { fieldName }
          className   = { inputClasses }
          type        = { fieldName == 'email' ? 'email' : 'text' }
          name        = { fieldName }
          placeholder = { fieldNameTranslations[fieldName].fi }
          value       = { this.state[fieldName] }
          onChange    = { this.onChange } />
      ))
    })

    return (
      <div>
        <form className={ formClasses } onSubmit={ this.onSubmit }>
          { feedbackMessages }
          { inputFields }
          <button
            className = 'btn btn__submit'
            type      = 'submit'
            title     = 'Lähetä'
            disabled  = { this.state.errors.length || this.state.submitted }>
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
