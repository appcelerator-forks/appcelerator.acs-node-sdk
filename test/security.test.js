var assert = require('assert'),
	ACSNode = require('../index'),
	fs = require('fs'),
	path = require('path'),
	request = require('appc-request-ssl');

describe('Security Test', function() {
	this.timeout(10000);

	var fingerprintRegex = /^SHA1\sFingerprint=(.*)/;
	var DEFAULT_API_ENTRY_POINT_FINGERPRINT = fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'appc-request-ssl', 'fingerprints', ACSNode.DEFAULT_API_ENTRY_POINT.replace(/^https?\:\/\//, ''))).toString();
	var DEFAULT_API_TEST_ENTRY_POINT_FINGERPRINT = fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'appc-request-ssl', 'fingerprints', ACSNode.DEFAULT_API_TEST_ENTRY_POINT.replace(/^https?\:\/\//, ''))).toString();

	it('should validate DEFAULT_API_ENTRY_POINT',function(done){
		if (process.env.TRAVIS) {
			assert.equal(process.env.FINGERPRINT_DEFAULT.replace(fingerprintRegex,'$1'), DEFAULT_API_ENTRY_POINT_FINGERPRINT);
			done();
		} else {
			request.getFingerprintForURL(ACSNode.DEFAULT_API_ENTRY_POINT, function(err,fingerprint){
				assert.ifError(err);
				assert.equal(fingerprint, DEFAULT_API_ENTRY_POINT_FINGERPRINT);
				done();
			});
		}
	});

	it('should validate DEFAULT_API_TEST_ENTRY_POINT',function(done){
		if (process.env.TRAVIS) {
			assert.equal(process.env.FINGERPRINT_TEST.replace(fingerprintRegex,'$1'), DEFAULT_API_TEST_ENTRY_POINT_FINGERPRINT);
			done();
		} else {
			request.getFingerprintForURL(ACSNode.DEFAULT_API_TEST_ENTRY_POINT, function(err,fingerprint){
				assert.ifError(err);
				assert.equal(fingerprint, DEFAULT_API_TEST_ENTRY_POINT_FINGERPRINT);
				done();
			});
		}
	});

});