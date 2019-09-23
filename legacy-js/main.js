"use strict";
import "./ga";
import ReactDOM from "react-dom";
import React from "react";

var inviteForm = React.createFactory(require("./components/inviteForm"));
var fader = React.createFactory(require("./components/fader"));
var members = React.createFactory(require("./components/members"));
var feed = React.createFactory(require("./components/feed"));
var email = React.createFactory(require("./components/email"));
var membershipForm = React.createFactory(
  require("./components/membershipForm")
);

const pathName = window.location.pathname;

document
  .querySelectorAll(".email")
  .forEach(element => ReactDOM.render(email(), element));

if (pathName == "/") {
  ReactDOM.render(inviteForm(), document.getElementById("invite-form"));

  ReactDOM.render(fader(), document.getElementById("fader"));

  ReactDOM.render(members(), document.getElementById("members"));

  ReactDOM.render(feed(), document.getElementById("feed"));
} else if (pathName == "/yhdistys.html") {
  ReactDOM.render(membershipForm(), document.getElementById("membership-form"));

  ReactDOM.render(fader(), document.getElementById("fader"));

  ReactDOM.render(
    React.createElement("div", {}, [members({ key: 0 }), members({ key: 1 })]),
    document.getElementById("members")
  );
}
