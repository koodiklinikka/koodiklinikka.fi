import _ from "lodash";
import request from "axios";
import React from "react";
import classSet from "classnames";
import api from "../api";
import Loader from "../Loader";

var fieldNameTranslations = {
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

const fieldNames = ["name", "email", "handle", "address", "postcode", "city"];

function getUserInfo(state) {
  return _.pick(state, fieldNames);
}

export default class MembershipInfoForm extends React.Component {
  state = {
    address: "",
    city: "",
    email: "",
    handle: "",
    name: "",
    postcode: "",
    sending: false,
    pristineFields: fieldNames,
  };

  onSubmit = () => {
    this.setState({
      sending: true,
      error: null,
    });

    request
      .post(api("membership"), {
        userInfo: getUserInfo(this.state),
      })
      .then(() => {
        this.setState({ sending: false });
        this.props.onSignupSuccess();
      })
      .catch(err => {
        this.setState({ error: err, sending: false });
      });
  };

  onChange = e => {
    var name = e.target.name;
    if (e.target.value === this.state[name]) {
      return;
    }

    this.setState({
      [e.target.name]: e.target.value,
      pristineFields: this.state.pristineFields.filter(
        fieldName => fieldName !== name
      ),
      errors: [],
    });
  };

  getDataErrors = () => {
    var foundErrors = [];

    fieldNames.forEach(fieldName => {
      if (!this.state[fieldName]) {
        foundErrors.push({ field: fieldName, type: "missing" });
      }
    });

    if (this.state.email && !validateEmail(this.state.email)) {
      foundErrors.push({ field: "email", type: "invalid" });
    }

    return foundErrors;
  };

  render() {
    const inputErrors = this.getDataErrors();

    var formClasses = classSet({
      form: true,
      "membership-form": true,
      "has-error": inputErrors.length !== 0 || this.state.error,
      sending: this.state.sending,
    });

    function getErrorMessage(err) {
      var feedbackText;

      if (err.type === "missing") {
        feedbackText = `${fieldNameTranslations[err.field].fi} on pakollinen.`;
      } else if (err.type === "invalid") {
        feedbackText = `${fieldNameTranslations[err.field].fi} on virheellinen.`;
      }

      return (
        <div key={err.field} className="form--message">
          {feedbackText}
        </div>
      );
    }

    /* generate error messages */
    var visibleErrors = inputErrors.filter(
      error => this.state.pristineFields.indexOf(error.field) === -1
    );

    var fieldsWithErrors = visibleErrors.map(({ field }) => field);

    var inputFields = fieldNames.map(fieldName => {
      var inputClasses = classSet({
        input: true,
        "has-error": _.includes(fieldsWithErrors, fieldName),
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
