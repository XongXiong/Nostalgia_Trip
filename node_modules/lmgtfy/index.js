'use strict';

const strictUriEncode = require('strict-uri-encode');

module.exports = query => {
  return 'http://lmgtfy.com/?q=' + strictUriEncode(query);
};
