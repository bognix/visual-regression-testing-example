var assert = require('chai').assert,
	configLoader = require('vrt').config,
	testCaseLoader = require('vrt').testcase,
	driver = require('vrt').driver;

describe('fandom', function () {
	var config, client, testCase;

	beforeEach(function () {
		testCase = testCaseLoader.load(this);
		config = configLoader.loadConfig(testCase);
		client = driver.loadClient(config);
	});

	it('fandom page', function (done) {
		client
			.init()
			.url('https://fandom.wikia.com')
			.webdrivercss(testCase.group, config.webdrivercssTestCase, function (err, resp) {
				assert.equal(0, resp[testCase.name][0].misMatchPercentage, 'Mismatch percentage different than 0');
				assert.isOk(resp[testCase.name][0].isExactSameImage);
			})
			.call(done);
	});

	after(function (done) {
		client.end(done);
	});
});
