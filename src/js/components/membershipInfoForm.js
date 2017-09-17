import { pick, includes } from "lodash";
import React from "react";
import classSet from "classnames";
import request from "axios";

import StripeCheckout from "react-stripe-checkout";

import api from "../api";
import Loader from "./loader";
import getConfig from "../../config";

const config = getConfig();

const fieldNameTranslations = {
  address: { fi: "Osoite" },
  city: { fi: "Paikkakunta" },
  email: { fi: "Sähköpostiosoite" },
  handle: { fi: "Slack-käyttäjätunnus " },
  name: { fi: "Koko nimi " },
  postcode: { fi: "Postinumero" }
};

function validateEmail(email) {
  const emailRegexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegexp.test(email);
}

const fieldNames = ["name", "email", "handle", "address", "postcode", "city"];

function getUserInfo(state) {
  return pick(state, fieldNames);
}

module.exports = React.createClass({
  getInitialState() {
    return {
      address: "",
      city: "",
      email: "",
      handle: "",
      name: "",
      postcode: "",
      sending: false,
      pristineFields: fieldNames
    };
  },
  onSubmit(token) {
    this.setState({
      sending: true,
      error: null
    });

    request
      .post(api("membership"), {
        userInfo: getUserInfo(this.state),
        stripeToken: token.id
      })
      .then(() => {
        this.setState({ sending: false });
        this.props.onPaymentSuccess();
      })
      .catch(err => {
        this.setState({ error: err, sending: false });
      });
  },
  onChange(e) {
    const name = e.target.name;
    if (e.target.value === this.state[name]) {
      return;
    }

    this.setState({
      [e.target.name]: e.target.value,
      pristineFields: this.state.pristineFields.filter(
        fieldName => fieldName !== name
      ),
      errors: []
    });
  },

  getDataErrors() {
    const foundErrors = [];

    fieldNames.forEach(fieldName => {
      if (!this.state[fieldName]) {
        foundErrors.push({ field: fieldName, type: "missing" });
      }
    });

    if (this.state.email && !validateEmail(this.state.email)) {
      foundErrors.push({ field: "email", type: "invalid" });
    }

    return foundErrors;
  },
  handleError(err) {
    this.setState({ error: err, sending: false });
  },
  render() {
    const inputErrors = this.getDataErrors();

    const formClasses = classSet({
      form: true,
      "membership-form": true,
      "has-error": inputErrors.length !== 0 || this.state.error,
      sending: this.state.sending
    });

    function getErrorMessage(err) {
      let feedbackText;

      if (err.type === "missing") {
        feedbackText = `${fieldNameTranslations[err.field].fi} on pakollinen.`;
      } else if (err.type === "invalid") {
        feedbackText = `${fieldNameTranslations[err.field]
          .fi} on virheellinen.`;
      }

      return (
        <div key={err.field} className="form--message">
          {feedbackText}
        </div>
      );
    }

    /* generate error messages */
    const visibleErrors = inputErrors.filter(
      error => this.state.pristineFields.indexOf(error.field) === -1
    );

    const fieldsWithErrors = visibleErrors.map(({ field }) => field);

    const inputFields = fieldNames.map(fieldName => {
      const inputClasses = classSet({
        input: true,
        "has-error": includes(fieldsWithErrors, fieldName),
        half: fieldName === "city" || fieldName === "postcode",
        left: fieldName === "postcode"
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
          <StripeCheckout
            amount={1000}
            currency="EUR"
            description="Jäsenmaksu"
            email={this.state.email}
            image="https://avatars3.githubusercontent.com/u/10520119?v=3&s=200"
            locale="fi"
            name="Koodiklinikka ry"
            stripeKey={config.stripe.publicKey}
            token={this.onSubmit}
          >
            <button
              type="button"
              disabled={inputErrors.length !== 0}
              className="btn btn__submit"
            >
              Siirry maksamaan
            </button>
          </StripeCheckout>
          <p>
            <small>
              Seuraava vuosimaksu veloitetaan automaattisesti <br />kortiltasi
              vuoden kuluttua.
            </small>
          </p>
        </form>
      </div>
    );
  }
});
