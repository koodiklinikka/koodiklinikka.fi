import { templateSettings, template } from "lodash";
import githubEvent from "parse-github-event";
import twitterText from "twitter-text";

const isVisibleGithubEvent = ({ type }) =>
  type !== "PushEvent" && type !== "DeleteEvent";

export function github(items) {
  return items.filter(isVisibleGithubEvent).map(item => {
    templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    const renderTemplate = template(githubEvent.parse(item).text);

    const repository = `https://github.com/${item.repo.name}`;

    let branch;
    if (item.payload.ref) {
      branch = item.payload.ref.replace("refs/heads/", "");
    }

    const message = renderTemplate({
      repository: `<a target="_blank" href="${repository}">${item.repo
        .name}</a>`,
      branch: branch,
      number: item.payload.number,
      ref_type: item.payload.ref_type,
      ref: item.payload.ref
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
      type: "github"
    };
  });
}

export function twitter(items) {
  return items.map(item => {
    const shownItem = item.retweeted ? item.retweeted_status : item;
    const url = `https://twitter.com/${shownItem.user.screen_name}`;

    return {
      user: `@${shownItem.user.screen_name}`,
      userLink: url,
      image: shownItem.user.profile_image_url_https,
      imageLink: url,
      body: twitterText.autoLink(shownItem.text),
      timestamp: new Date(shownItem.created_at),
      type: "twitter"
    };
  });
}
