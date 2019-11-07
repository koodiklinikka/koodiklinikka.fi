import lodashTemplate from "lodash/template";
import defaultTemplateSettings from "lodash/templateSettings";
import githubEvent from "parse-github-event";
import twitterText from "twitter-text";

const isVisibleGithubEvent = ({ type }) =>
  type !== "PushEvent" && type !== "DeleteEvent";

const templateSettings = {
  ...defaultTemplateSettings,
  interpolate: /{{([\s\S]+?)}}/g,
};

export default {
  github(items) {
    return items.filter(isVisibleGithubEvent).map(item => {
      const template = lodashTemplate(
        githubEvent.parse(item).text,
        templateSettings,
        false
      );

      const repository = `https://github.com/${item.repo.name}`;
      let branch;
      if (item.payload.ref) {
        branch = item.payload.ref.replace("refs/heads/", "");
      }

      const message = template({
        repository: `<a target="_blank" href="${repository}">${item.repo.name}</a>`,
        branch: branch,
        number: item.payload.number,
        ref_type: item.payload.ref_type,
        ref: item.payload.ref,
      });

      const url = `https://github.com/${item.actor.login}`;

      return {
        user: item.actor.login,
        userLink: url,
        image: item.actor.avatar_url,
        imageLink: url,
        body: message,
        timestamp: new Date(item.created_at),
        url: message.url,
        type: "github",
      };
    });
  },
  twitter(items) {
    return items.map(item => {
      if (item.retweeted) {
        item = item.retweeted_status;
      }

      const url = `https://twitter.com/${item.user.screen_name}`;

      return {
        user: `@${item.user.screen_name}`,
        userLink: url,
        image: item.user.profile_image_url_https,
        imageLink: url,
        body: twitterText.autoLink(item.text),
        timestamp: new Date(item.created_at),
        type: "twitter",
      };
    });
  },
};
