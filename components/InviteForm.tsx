import request from "axios";
import React from "react";
import classSet from "classnames";
import api from "./api";
import Loader from "./Loader";

type InviteFormState = {
  submitted: boolean;
  sending: boolean;
  error: any | null;
  email: string;
};
export default class InviteForm extends React.Component {
  public state: InviteFormState = {
    email: "",
    submitted: false,
    sending: false,
    error: null,
  };

  onSubmit = async (e: React.FormEvent) => {
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

  handleError = (error: any) => {
    this.setState({ error, sending: false });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      "invite-form__input": true,
      "has-success": this.state.submitted,
      "has-error": this.state.error,
    });

    let feedbackMessage;

    if (this.state.error || this.state.submitted) {
      let messageText;

      if (this.state.submitted) {
        messageText = "Kutsu lähetetty antamaasi sähköpostiosoitteeseen.";
      } else if (
        this.state.error.response.status === 400 &&
        this.state.error.response.data === "invalid_email"
      ) {
        messageText = "Tarkasta syöttämäsi sähköpostiosoite";
      } else if (
        this.state.error.response.status === 400 &&
        this.state.error.response.data === "already_invited"
      ) {
        messageText = "Sähköpostiosoitteeseen on jo lähetetty kutsu";
      } else if (
        this.state.error.response.status === 400 &&
        this.state.error.response.data === "already_in_team"
      ) {
        messageText = (
          <span>
            Tällä sähköpostilla on jo luotu tunnus. <br /> Voit vaihtaa
            unohtuneen salasanasi{" "}
            <a href="https://koodiklinikka.slack.com/forgot">täältä</a>.
          </span>
        );
      } else {
        messageText = "Jotain meni pieleen. Yritä hetken päästä uudelleen.";
      }

      feedbackMessage = <div className="form--message">{messageText}</div>;
    }

    return (
      <form className={formClasses} onSubmit={this.onSubmit}>
        <div className="form__field">
          <label className="label" htmlFor="email-field">
            Sähköpostiosoite:
          </label>
          <div className="controls-wrapper">
            <span className="input-wrapper">
              <input
                className={inputClasses}
                type="text"
                name="email"
                id="email-field"
                // Placeholder is not accessible way to provide information
                // Used here for :placeholder-shown -styles
                placeholder=""
                value={this.state.email}
                onChange={this.onChange}
              />
              <div className="invite-form__loader">
                <Loader />
              </div>
            </span>
            <button
              className="btn btn__submit"
              type="submit"
              title="Lähetä"
              disabled={this.state.error || this.state.submitted}
            >
              Lähetä
            </button>
          </div>
        </div>
        {feedbackMessage}
      </form>
    );
  }
}
