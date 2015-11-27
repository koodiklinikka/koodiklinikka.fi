var host = process.env.SERVER || 'https://lit-plateau-4689.herokuapp.com/';

module.exports = function(path) {
  return host + path;
}
