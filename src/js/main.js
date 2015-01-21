'use strict';

require('./ga');
var request = require('axios');
var form = document.getElementById('invite');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  form.classList.remove('has-success', 'has-error');
  var email = event.target.elements.email.value;

  request.post('/api/invites', {
    email: email
  }).then(function() {
    form.classList.add('has-success');
  }).catch(function() {
    form.classList.add('has-error');
  });
});
