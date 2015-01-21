'use strict';

require('./ga');

var _ = require('lodash');
var request = require('axios');

var inviteForm = require('./components/inviteForm');
var {diff, patch, create} = require('virtual-dom');

var state = {
  email: '',
  submitted: false,
  error: null
};

function setState(newState) {
  state = _.extend({}, state, newState);
  rerender(state);
}

var props = {
  onSubmit: function(e) {
    e.preventDefault();

    setState({
      submitted: false,
      error: null
    });

    request.post('/api/invites', {
      email: state.email.email
    }).then(function() {
      setState({submitted: true});
    }).catch(function(err) {
      setState({error: err});
    });
  },
  onChange: function(e) {
    if(e.target.value === state.email) {
      return;
    }

    setState({
      email: e.target.value,
      error: null,
      submitted: false
    });
  },
};

var tree = inviteForm(props, state);
var rootNode = create(tree);

document
  .getElementById('invite-form')
  .appendChild(rootNode);

function rerender() {
  var newTree = inviteForm(props, state);
  var patches = diff(tree, newTree);
  rootNode = patch(rootNode, patches);
  tree = newTree;
}


