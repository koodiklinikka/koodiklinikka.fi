'use strict';

var React = require('react');
var request = require('axios');

var API_URL = 'https://api.github.com/orgs/koodiklinikka/public_members';

module.exports = React.createClass({
  getInitialState() {
    return {
      members: []
    };
  },
  componentDidMount() {
    request.get(API_URL).then(function(res) {
      this.setState({
        members: res.data
      });
    }.bind(this));
  },
  render() {

    var members = this.state.members.map(function(member) {
      var src = `${member.avatar_url}&s=120`;
      return (
        <a href={member.html_url} target="_blank">
          <img className="member" src={src} />
        </a>
      );
    });

    return (
      <div className="members">{members}</div>
    )
  }
});
