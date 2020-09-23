import axios from "axios";

export interface Channel {
  id: string;
  name: string;
  topic: string;
  num_members: number;
  purpose: {
    value: string;
    creator: string;
    last_set: number;
  };
  messages_today: number;
  unique_members_today: number;
}

export async function getChannels() {
  const response = await axios.get<Channel[]>(
    "http://stats.koodiklinikka.fi/api/channels"
  );
  return response.data;
}
