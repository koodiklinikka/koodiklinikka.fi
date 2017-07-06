import React from 'react';
import request from 'axios';
import { shuffle } from 'lodash';
import getAPIPath from '../api';

export default React.createClass({
  getInitialState() {
    return {
      members: []
    };
  },
  componentDidMount() {
    request.get(getAPIPath('members')).then((res) => {
      this.setState({
        members: shuffle(res.data)
      });
    });
  },
  render() {

    const members = this.state.members.map((member, i) => {
      const src = `${member.avatar_url}&s=120`;
      return (
        <img className="member" key={i} src={src} />
      );
    });

    return (
      <div className="members">
        <a href="https://github.com/koodiklinikka" target="_blank">
          {members}
        </a>
      </div>
    );
  }
});
