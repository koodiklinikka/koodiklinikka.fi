const host = process.env.SERVER || "https://koodiklinikka-api.herokuapp.com/";

export default function getApiURL(path) {
  return host + path;
}
