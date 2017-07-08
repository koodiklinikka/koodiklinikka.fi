'use strict';

var _        = require('lodash');
var request  = require('axios');
var React    = require('react');
var classSet = require('classnames');

var api            = require('../api');
var StripeCheckout = require('./stripeCheckout.js');

var fieldNameTranslations = {
  address:   { fi: "Osoite" },
  city:      { fi: "Paikkakunta" },
  email:     { fi: "Sähköpostiosoite" },
  handle:    { fi: "Slack-käyttäjätunnus "},
  name:      { fi: "Koko nimi "},
  postcode:  { fi: "Postinumero" }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const fieldNames = ['name', 'email', 'handle', 'address', 'city', 'postcode'];

module.exports = React.createClass({

  getInitialState() {
    return {
      address:   '',
      city:      '',
      email:     '',
      errors:    [],
      handle:    '',
      name:      '',
      postcode:  '',
      sending:   false
    };
  },
  onSubmit(e) {
    e.preventDefault();

    this.setState({
      sending: true,
      errors: []
    });

    if (this.getDataErrors().length) {
      this.setState({
        sending: false,
        errors:  userInfoErrors
      });
    } else {
      this.props.onSuccess({
        email:     this.state.email,
        name:      this.state.name,
        handle:    this.state.handle,
        address:   this.state.address,
        postcode:  this.state.postcode,
        city:      this.state.city,
      });
    }
  },
  handleError(err) {
    this.setState({ error: err, sending: false });
  },
  onChange(e) {
    if (e.target.value === this.state[e.target.name]) {
      return;
    }

    this.setState({
      [e.target.name]: e.target.value,
      errors: []
    });
  },

  getDataErrors() {
    var foundErrors = [];

    fieldNames.forEach((fieldName) => {
      if(!this.state[fieldName])
        foundErrors.push({ field: fieldName, type: 'missing' })
    })

    if(this.state.email && !validateEmail(this.state.email))
      foundErrors.push({ field: 'email', type: 'invalid' });

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
    var inputFields = [];

    fieldNames.forEach((fieldName) => {
      var inputClasses = classSet({
        'input': true,
        'has-error': _.includes(fieldsWithErrors, fieldName),
        'half': fieldName == 'city' || fieldName == 'postcode',
        'left': fieldName == 'city'
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
