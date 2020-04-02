import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import onboardingData from '../../../mirage/fixtures/onboarding-data';
import camelcaseKeysDeep from 'camelcase-keys-deep';
import decamelizeKeysDeep from 'decamelize-keys-deep';
import url from 'example/types/url';

module('Unit | Service | onboarding', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let onboarding;
  let response;

  hooks.beforeEach(function() {
    onboarding = this.owner.lookup('service:onboarding');

    this.server.post(url.ONBOARD_USER_CREDENTIALS, function(schema, request) {
      response = JSON.parse(request.requestBody);

      response = decamelizeKeysDeep(response);
      response = Object.assign(response, onboardingData);

      return JSON.stringify(response);
    });

    this.server.post(url.ONBOARD_USER_PASSWORD, function(schema, request) {
      response = JSON.parse(request.requestBody);

      return JSON.stringify(response);
    });

    this.server.get(url.ONBOARD_USER, function() {
      let response = decamelizeKeysDeep(onboardingData);

      return JSON.stringify(response);
    });
  });

  hooks.afterEach(function() {
    onboarding.clearToken();
    onboarding = null;
  });

  test('headers', async function(assert) {
    onboarding.token = '1234';

    assert.expect(2);

    this.server.get('/onboard/users', function(schema, request) {
      assert.equal(request.requestHeaders.authentication, '1234');
    });

    await onboarding.load();

    assert.deepEqual(onboarding.headers, { "Authentication": "1234" });
  });

  test('load', async function(assert) {
    onboarding.token = '1234';

    await onboarding.load();

    assert.deepEqual(onboarding.data, camelcaseKeysDeep(onboardingData));
  });

  test('sendPassword', async function(assert) {
    let passwordManager = this.owner.lookup('service:password-manager');
    passwordManager.password = 'abc123DEFg';

    onboarding.token = '1234';

    let data = { password: passwordManager.password }

    await onboarding.sendPassword(data);

    assert.deepEqual(response, { password: 'abc123DEFg' });
  });

  test('sendCredentials', async function(assert) {
    onboarding.token = '1234';

    let data = { 
      foo: 'bar',
    };

    await onboarding.sendPassword(data);

    assert.deepEqual(response, { foo: 'bar' });
  });

  test('status', async function(assert) {
    onboarding.token = '1234';

    await onboarding.load();

    assert.deepEqual(onboarding.status, 'PASSWORD');
  });

  test('clearToken', async function(assert) {
    onboarding.token = '1234';

    onboarding.clearToken();

    assert.notOk(onboarding.token);
  });
});
