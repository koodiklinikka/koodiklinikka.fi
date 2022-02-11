export interface KKEvent {
  image: string;
  imageLink: string;
  body: string;
  type: "github" | "twitter";
  user: string;
  userLink: string;
  timestamp: Date;
}
