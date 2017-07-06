import ReactDOM from 'react-dom';
import React from 'react';

import './ga';

import InviteForm from './components/inviteForm';
import Fader from './components/fader';
import Members from './components/members';
import Feed from './components/feed';
import Email from './components/email';
import MembershipForm from './components/membershipForm';

const inviteForm = React.createFactory(InviteForm);
const fader = React.createFactory(Fader);
const members = React.createFactory(Members);
const feed = React.createFactory(Feed);
const email = React.createFactory(Email);
const membershipForm = React.createFactory(MembershipForm);

const pathName = window.location.pathname;

if (pathName === '/') {
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
} else if (pathName === '/yhdistys.html') {
  ReactDOM.render(
    membershipForm(),
    document.getElementById('membership-form'));

  ReactDOM.render(
    fader(),
    document.getElementById('fader'));

  ReactDOM.render(
    React.createElement('div', {}, [
      members({ key: 0 }),
      members({ key: 1 })
    ]),
    document.getElementById('members'));
}
