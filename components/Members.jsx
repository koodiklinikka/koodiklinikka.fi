import React from "react";
import request from "axios";
import _ from "lodash";
import api from "./api";

export default class Members extends React.Component {
  state = {
    members: [],
  };

  componentDidMount() {
    this.refreshMembers();
  }

  async refreshMembers() {
    const res = await request.get(api("members"));
    this.setState({
      members: _.shuffle(res.data),
    });
  }

  render() {
    const members = this.state.members.map(member => {
      const src = `${member.avatar_url}&s=120`;
      return <img className="member" key={member.avatar_url} src={src} />;
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
