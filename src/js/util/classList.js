'use strict';

module.exports = function classList(classesObj) {
  var classes = [];
  for(var key in classesObj) {
    if(!!classesObj[key]) {
      classes.push(key);
    }
  }
  return classes.join(' ');
};
