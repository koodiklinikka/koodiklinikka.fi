'use strict';

var React = require('react');
var request = require('axios');
var _ = require('lodash');

var api = require('../api');

module.exports = React.createClass({
  getInitialState() {
    return {
      members: []
    };
  },
  componentDidMount() {
    request.get(api('members')).then(function(res) {
      this.setState({
        members: _.shuffle(res.data)
      });
    }.bind(this));
  },
  render() {

    var members = this.state.members.map(function(member, i) {
      var src = `${member.avatar_url}&s=120`;
      return (
        <img className="member" key={i} src={src} />
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
