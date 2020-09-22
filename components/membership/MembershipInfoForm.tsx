import request from "axios";
import React from "react";
import classSet from "classnames";
import api from "../api";
import Loader from "../Loader";

type Props = {
  onSignupSuccess: () => void;
};

type State = {
  error: boolean;
  errors: string[];
  fields: {
    name: string;
    email: string;
    handle: string;
    address: string;
    postcode: string;
    city: string;
  };
  sending: boolean;
  pristineFields: string[];
};

const fieldNameTranslations = {
  address: { fi: "Osoite" },
  city: { fi: "Paikkakunta" },
  email: { fi: "Sähköpostiosoite" },
  handle: { fi: "Slack-käyttäjätunnus " },
  name: { fi: "Koko nimi " },
  postcode: { fi: "Postinumero" },
};

const mailValidateRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email) {
  return mailValidateRe.test(email);
}

function getUserInfo(state) {
  return state.fields;
}

export default class MembershipInfoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setState({
      fields: {
        address: "",
        city: "",
        email: "",
        handle: "",
        name: "",
        postcode: "",
      },
      sending: false,
      pristineFields: Object.keys(this.state.fields),
    });
  }

  onSubmit = async () => {
    this.setState({
      sending: true,
      error: null,
    });

    try {
      await request.post(api("membership"), {
        userInfo: getUserInfo(this.state),
      });
      this.setState({ sending: false });
      this.props.onSignupSuccess();
    } catch (err) {
      this.setState({ error: err, sending: false });
    }
  };

  onChange = (e) => {
    const name = e.target.name;
    if (e.target.value === this.state[name]) {
      return;
    }

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: e.target.value,
      },
      pristineFields: this.state.pristineFields.filter(
        (fieldName) => fieldName !== name
      ),
      errors: [],
    });
  };

  getDataErrors = () => {
    const foundErrors = [];

    Object.keys(this.state.fields).forEach((fieldName) => {
      if (!this.state[fieldName]) {
        foundErrors.push({ field: fieldName, type: "missing" });
      }
    });

    if (this.state.fields.email && !validateEmail(this.state.fields.email)) {
      foundErrors.push({ field: "email", type: "invalid" });
    }

    return foundErrors;
  };

  render() {
    const inputErrors = this.getDataErrors();

    const formClasses = classSet({
      form: true,
      "membership-form": true,
      "has-error": inputErrors.length !== 0 || this.state.error,
      sending: this.state.sending,
    });

    function getErrorMessage(err) {
      let feedbackText;

      const fieldName = fieldNameTranslations[err.field].fi;
      if (err.type === "missing") {
        feedbackText = `${fieldName} on pakollinen.`;
      } else if (err.type === "invalid") {
        feedbackText = `${fieldName} on virheellinen.`;
      }

      return (
        <div key={err.field} className="form--message">
          {feedbackText}
        </div>
      );
    }

    /* generate error messages */
    const visibleErrors = inputErrors.filter(
      (error) => this.state.pristineFields.indexOf(error.field) === -1
    );

    const fieldsWithErrors = visibleErrors.map(({ field }) => field);

    const inputFields = Object.keys(this.state.fields).map((fieldName) => {
      const inputClasses = classSet({
        input: true,
        "has-error": fieldsWithErrors.includes(fieldName),
        half: fieldName === "city" || fieldName === "postcode",
        left: fieldName === "postcode",
      });

      function showsErrorFor(field) {
        if (fieldName === "city") {
          return false;
        }

        return (
          field === fieldName || (fieldName === "postcode" && field === "city")
        );
      }

      return (
        <span key={fieldName}>
          <input
            className={inputClasses}
            type={fieldName === "email" ? "email" : "text"}
            name={fieldName}
            placeholder={fieldNameTranslations[fieldName].fi}
            value={this.state[fieldName]}
            onChange={this.onChange}
          />
          {visibleErrors
            .filter(({ field }) => showsErrorFor(field))
            .map(getErrorMessage)}
        </span>
      );
    });
    if (this.state.sending) {
      return (
        <div className="membership-form__loader">
          <Loader />
        </div>
      );
    }
    return (
      <div>
        <h3>Liity jäseneksi</h3>
        <form className={formClasses}>
          {inputFields}
          {this.state.error && (
            <div className="form--message">
              Jotain meni pieleen! Ota yhteyttä info@koodiklinikka.fi
            </div>
          )}
          <br />
          <button
            type="button"
            disabled={inputErrors.length !== 0}
            className="btn btn__submit"
            onClick={this.onSubmit}
          >
            Liity jäseneksi
          </button>
        </form>
      </div>
    );
  }
}
