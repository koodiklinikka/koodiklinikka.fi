import React from "react";
import request from "axios";
import _ from "lodash";
import api from "./api";

export default class Members extends React.Component {
  state = {
    members: []
  };

  componentDidMount() {
    request.get(api("members")).then(
      function(res) {
        this.setState({
          members: _.shuffle(res.data)
        });
      }.bind(this)
    );
  }

  render() {
    var members = this.state.members.map(function(member, i) {
      var src = `${member.avatar_url}&s=120`;
      return <img className="member" key={i} src={src} />;
    });

    return (
      <div className="members">
        <a href="https://github.com/koodiklinikka" target="_blank">
          {members}
        </a>
      </div>
    );
  }
}
