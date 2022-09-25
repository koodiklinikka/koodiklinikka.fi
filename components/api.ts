const host = process.env.SERVER || "https://koodiklinikka-api.fly.dev/";

export default function getApiURL(path) {
  return host + path;
}
