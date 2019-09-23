var host = process.env.SERVER || 'https://lit-plateau-4689.herokuapp.com/';

export default function(path) {
  return host + path;
};
