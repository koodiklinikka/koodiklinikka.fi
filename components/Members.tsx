import React from "react";
import request from "axios";
import shuffle from "lodash/shuffle";
import api from "./api";

interface Member {
  avatar_url: string;
}

interface MembersState {
  members: Member[];
}

export default class Members extends React.Component {
  public state: MembersState = {
    members: [],
  };

  componentDidMount() {
    this.refreshMembers();
  }

  async refreshMembers() {
    const res = await request.get(api("members"));
    this.setState({
      members: shuffle(res.data),
    });
  }

  render() {
    const members = this.state.members.map((member) => {
      const src = `${member.avatar_url}&s=120`;
      return (
        <img
          className="member"
          key={member.avatar_url}
          src={src}
          alt=""
          width={30}
          height={30}
          loading="lazy"
        />
      );
    });

    return (
      <div className="members" aria-hidden="true">
        <a
          href="https://github.com/koodiklinikka"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
        >
          {members}
        </a>
      </div>
    );
  }
}
