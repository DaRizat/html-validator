'use strict'

let request = require('request-promises');
let validUrl = require('valid-url');
let setupOptions = require('./lib/setup-options');
let async = require('asyncawait/async');
let await = require('asyncawait/await');

let validator = async ((options) => {
	if (!options) {
		throw new Error('Missing required input: options object');
	}

	if (!options.url && !options.data) {
		throw new Error('Missing required params: url or data');
	}

	if (options.url && !validUrl.isWebUri(options.url)) {
		throw new Error('Invalid url');
	}

	var reqOpts = setupOptions(options)
	try {
		let res = await request(reqOpts);
		if( res && res.statusCode !== 200){
			throw new Error('Validator returned unexpected statuscode: ' + res.statusCode);
		}
		return options.format === 'json' ? JSON.parse(res) : res;
	} catch(err) {
		throw new Error(err);
	};
});

module.exports = validator
