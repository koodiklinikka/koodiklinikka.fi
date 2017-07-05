'use strict';
require('./ga');
let ReactDOM = require('react-dom');
var React = require('react');

var inviteForm = React.createFactory(require('./components/inviteForm'));
var fader = React.createFactory(require('./components/fader'));
var members = React.createFactory(require('./components/members'));
var feed = React.createFactory(require('./components/feed'));
var email = React.createFactory(require('./components/email'));
var membershipForm = React.createFactory(require('./components/membershipForm'));

const pathName = window.location.pathname;
console.log(pathName);

if(pathName == '/') {
  ReactDOM.render(
    inviteForm(),
    document.getElementById('invite-form'));

  ReactDOM.render(
    fader(),
    document.getElementById('fader'));

  ReactDOM.render(
    members(),
    document.getElementById('members'));

  ReactDOM.render(
    feed(),
    document.getElementById('feed'));

  ReactDOM.render(
    email(),
    document.getElementById('email'));
} else if (pathName == '/yhdistys.html') {
  ReactDOM.render(
    membershipForm(),
    document.getElementById('membership-form'));

  ReactDOM.render(
    fader(),
    document.getElementById('fader'));

  ReactDOM.render(
    email(),
    document.getElementById('email'));

  ReactDOM.render(
    members(),
    document.getElementById('members'));
}
