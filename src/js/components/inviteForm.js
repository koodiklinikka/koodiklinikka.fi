'use strict';

var {h} = require('virtual-dom');
var classList = require('../util/classList');

function render(props, state) {
  var emailInput = h('input', {
    className: classList({
      'input': true,
      'has-success': state.submitted,
      'has-error': state.error
    }),
    type: 'text',
    name: 'email',
    placeholder: 'Email',
    value: state.email,
    onkeydown: props.onChange
  });

  var submitButton = h('button', {
    className: 'btn btn__submit',
    type: 'submit',
    title: 'Lähetä',
    disabled: state.error || state.submitted
  }, '⏎');

  return h('form', {
    className: classList({
      'invite-form': true,
      'has-success': state.submitted,
      'has-error': state.error
    }),
    onsubmit: props.onSubmit
  }, [
    emailInput,
    submitButton
  ]);
}

module.exports = render;
