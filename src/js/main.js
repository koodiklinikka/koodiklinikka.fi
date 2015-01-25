'use strict';
require('./ga');

var React = require('React');

React.render(
  require('./components/inviteForm')(),
  document.getElementById('invite-form'));

