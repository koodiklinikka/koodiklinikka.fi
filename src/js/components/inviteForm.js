'use strict';

var {h} = require('virtual-dom');
var classList = require('../util/classList');

function render(props, state) {
  var formClasses = classList({
    'invite-form': true,
    'has-success': state.submitted,
    'has-error': state.error
  });

  var inputClasses = classList({
    'input': true,
    'has-success': state.submitted,
    'has-error': state.error
  });

  var feedbackMessage;

  if(state.error || state.submitted) {
    let messageText;

    if(state.submitted) {
      messageText = 'Kutsu lähetetty antamaasi sähköpostiosoitteeseen.';
    } else if(state.error.status === 400) {
      messageText = 'Tarkasta syöttämäsi sähköpostiosoite';
    } else {
      messageText = 'Jotain meni pieleen. Yritä hetken päästä uudelleen.';
    }

    feedbackMessage = (
      <div className='invite-form--message'>
        {messageText}
      </div>
    );

  }
  return (
    <form className={formClasses} onsubmit={props.onSubmit}>
      <input
        className={inputClasses}
        type='text'
        name='email'
        placeholder='Email'
        value={state.email}
        onkeydown={props.onChange} />
      <button
        className='btn btn__submit'
        type='submit'
        title='Lähetä'
        disabled={state.error || state.submitted}>
        ⏎
      </button>
      {feedbackMessage}
    </form>
    )
}

module.exports = render;
