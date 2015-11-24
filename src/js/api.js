var host = process.env.NODE_ENV === 'production' ? 'https://lit-plateau-4689.herokuapp.com/' : '/api/';

module.exports = function(path) {
  return host + path;
}
