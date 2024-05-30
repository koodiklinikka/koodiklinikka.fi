interface Channel {
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
