import { GithubApi } from "parse-github-event/lib/types";
import { KKEvent } from "../../data/events";
import githubEvent from "parse-github-event";
import lodashTemplate from "lodash/template";
import defaultTemplateSettings from "lodash/templateSettings";

const isVisibleGithubEvent = ({ type }: GithubApi.GithubEvent) =>
  type !== "PushEvent" && type !== "DeleteEvent";
const templateSettings = {
  ...defaultTemplateSettings,
  interpolate: /{{([\s\S]+?)}}/g,
};

function convertGithubEvent(item: GithubApi.GithubEvent): KKEvent {
  const parsedEvent = githubEvent.parse(item);
  const template = lodashTemplate(parsedEvent?.text, templateSettings, false);

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
    type: "github",
  };
}

export function convertGithubItems(items: readonly GithubApi.GithubEvent[]) {
  return items.filter(isVisibleGithubEvent).map(convertGithubEvent);
}
