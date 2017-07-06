const host = process.env.SERVER || 'https://lit-plateau-4689.herokuapp.com/';

export default function getAPIPath(path) {
  return host + path;
}
