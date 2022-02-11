import { KKEvent } from "../../data/events";
import twitterText from "twitter-text";

export interface TwitterItem {
  retweeted?: boolean;
  retweeted_status?: TwitterItem;
  user: {
    screen_name: string;
    profile_image_url_https: string;
  };
  text: string;
  created_at: number | string; // TODO: type?
}

function convertTwitterItem(item: TwitterItem): KKEvent {
  if (item.retweeted && item.retweeted_status) {
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
}

export function convertTwitterItems(items: readonly TwitterItem[]) {
  return items.map(convertTwitterItem);
}
