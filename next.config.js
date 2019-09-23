const withStylus = require('@zeit/next-stylus');
const withLess = require('@zeit/next-less');
const withFonts = require('next-fonts');
module.exports = withFonts(withLess(withStylus()));
