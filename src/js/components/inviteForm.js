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

  return (
    <form className={formClasses} onsubmit={props.onSubmit}>
      <input
        className={inputClasses}
        type='text'
        name='email'
        placeholder='email'
        value={state.email}
        onkeydown={props.onChange} />
      <button
        className='btn btn__submit'
        type='submit'
        title='Lähetä'
        disabled={state.error || state.submitted}>
        ⏎
      </button>
    </form>
    )
}

module.exports = render;
