#!/usr/bin/env node
'use strict';
const meow = require('meow');
const lmgtfy = require('./');

const cli = meow(`
	Usage
	  $ lmgtfy <query>
	Example
	  $ lmgtfy 'unicorns github'
	  http://lmgtfy.com/?q=unicorns+github
`);

console.log(lmgtfy(cli.input.join(' ')));
