'use strict';

var React = require('react');
var request = require('axios');

var API_URL = '/api/members';

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
        <img className='member' src={src} />
      );
    });

    return (
      <div className='members'>
        <a href='https://github.com/koodiklinikka' target='_blank'>
          {members}
        </a>
      </div>
    )
  }
});
