import request from "axios";
import React from "react";
import classSet from "classnames";
import api from "./api";
import Loader from "./Loader";

export default class InviteForm extends React.Component {
  state = {
    email: "",
    submitted: false,
    sending: false,
    error: null,
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({
      submitted: false,
      sending: true,
      error: null,
    });

    try {
      await request.post(api("invites"), {
        email: this.state.email.trim(),
      });
      this.handleSuccess();
    } catch (error) {
      this.handleError(error);
    }
  };

  handleSuccess = () => {
    this.setState({ submitted: true, sending: false });
  };

  handleError = err => {
    this.setState({ error: err, sending: false });
  };

  onChange = e => {
    if (e.target.value === this.state.email) {
      return;
    }
    this.setState({
      email: e.target.value,
      error: null,
      submitted: false,
    });
  };

  render() {
    const formClasses = classSet({
      form: true,
      "invite-form": true,
      "has-success": this.state.submitted,
      "has-error": this.state.error,
      sending: this.state.sending,
    });

    const inputClasses = classSet({
      input: true,
      "has-success": this.state.submitted,
      "has-error": this.state.error,
    });

    let feedbackMessage;

    if (this.state.error || this.state.submitted) {
      let messageText;

      if (this.state.submitted) {
        messageText = "Kutsu lähetetty antamaasi sähköpostiosoitteeseen.";
      } else if (
        this.state.error.status === 400 &&
        this.state.error.data === "invalid_email"
      ) {
        messageText = "Tarkasta syöttämäsi sähköpostiosoite";
      } else if (
        this.state.error.status === 400 &&
        this.state.error.data === "already_invited"
      ) {
        messageText = "Sähköpostiosoitteeseen on jo lähetetty kutsu";
      } else {
        messageText = "Jotain meni pieleen. Yritä hetken päästä uudelleen.";
      }

      feedbackMessage = <div className="form--message">{messageText}</div>;
    }

    return (
      <form className={formClasses} onSubmit={this.onSubmit}>
        <input
          className={inputClasses}
          type="text"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.onChange}
        />
        <button
          className="btn btn__submit"
          type="submit"
          title="Lähetä"
          disabled={this.state.error || this.state.submitted}
        >
          Lähetä
        </button>
        <div className="invite-form__loader">
          <Loader />
        </div>
        {feedbackMessage}
      </form>
    );
  }
}
