import React from "react";
import EmailComponent from "./EmailComponent";

export function Footer() {
  return (
    <footer>
      <div className="sponsors">
        <div className="sponsors__label">Yhteistyössä</div>
        <a href="http://futurice.com/" target="_blank">
          <img
            src="/static/images/futurice.svg"
            className="sponsor sponsor__futurice"
          />
        </a>
        <a href="http://www.metosin.fi/" target="_blank">
          <img
            src="/static/images/metosin.svg"
            className="sponsor sponsor__metosin"
          />
        </a>
        <a href="https://www.solita.fi/" target="_blank">
          <img src="/static/images/solita.svg" className="sponsor" />
        </a>
        <a href="http://wakeone.co/" target="_blank">
          <img
            src="/static/images/wakeone.svg"
            className="sponsor sponsor__wakeone"
          />
        </a>
        <a href="https://www.nordea.com/" target="_blank">
          <img
            src="/static/images/nordea.png"
            className="sponsor sponsor__nordea"
          />
        </a>
      </div>
      <div className="contacts">
        <div>
          <a href="https://koodiklinikka.slack.com">
            <i className="fa fa-slack" />
          </a>
          <a href="https://github.com/koodiklinikka/koodiklinikka.fi">
            <i className="fa fa-github" />
          </a>
          <a href="https://twitter.com/koodiklinikka">
            <i className="fa fa-twitter" />
          </a>
          <a href="https://www.linkedin.com/groups/12025476">
            <i className="fa fa-linkedin" />
          </a>
          <a href="https://www.facebook.com/koodiklinikka">
            <i className="fa fa-facebook" />
          </a>
          <div id="email">
            <EmailComponent />
          </div>
        </div>
      </div>
    </footer>
  );
}
