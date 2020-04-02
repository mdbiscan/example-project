import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, find, triggerEvent, waitFor, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import url from 'example/types/url';
import onboardingData from '../../mirage/fixtures/onboarding-data';
import onboardingStatus from 'example/types/onboarding-status';
import userRole from 'example/types/user-role';

module('Acceptance | onboard', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  let onboarding;

  hooks.beforeEach(function() {
    onboarding = this.owner.lookup('service:onboarding')
    onboarding.token = 'TEST';
  });

  hooks.afterEach(function() {
    onboarding.clearToken();
    onboarding = null;
  });

  test('takes you to start', async function(assert) {
    await visit('/onboard');

    assert.equal(currentURL(), '/onboard/start');
  });

  test('click to go to create password', async function(assert) {
    await visit('/onboard/start');

    await click('[data-role=complete-onboarding]');

    assert.equal(currentURL(), '/onboard/create-password');
  });

  test('create a password', async function(assert) {
    let password;

    this.server.post(url.ONBOARD_USER_PASSWORD, (schema, request) => {
      let data = JSON.parse(request.requestBody);

      password = data.password
    });

    await visit('/onboard/create-password');

    await click('[data-role=complete-onboarding]');

    assert.dom('button[data-role=create-password]').isDisabled();
    assert.dom('input[name=user-acceptance]').isNotChecked();

    await fillIn('input[name=password]', 'abc123DEF4');
    await fillIn('input[name=confirm-password]', 'abc123DEFabc');

    await triggerEvent('input[name=confirm-password]', 'keyup');

    await waitFor('[data-role=confirm-password-textbox-message]', {
      timeout: 500,
      count: 1,
    });

    assert.dom('[data-role=confirm-password-textbox-message]').hasText('Passwords do not match.');

    await click('input[name=user-acceptance]');

    assert.dom('input[name=user-acceptance]').isChecked();
    assert.dom('button[data-role=create-password]').isDisabled();

    await fillIn('input[name=confirm-password]', 'abc123DEF4');

    await triggerEvent('input[name=confirm-password]', 'keyup');

    await waitUntil(() =>  {
      let message = find('[data-role=confirm-password-textbox-message]');
      return message.textContent.trim().includes('Passwords match.');
    });

    assert.dom('[data-role=confirm-password-textbox-message]').hasText('Passwords match.');

    assert.dom('button[data-role=create-password]').isNotDisabled();

    await click('button[data-role=create-password]');

    assert.equal(password, 'abc123DEF4');

    assert.equal(currentURL(), '/onboard/add-credentials');
  });

  test('add credentials as a view-only user', async function(assert) {
    let firstName;
    let lastName;
    let workPhone;

    this.server.get(url.ONBOARD_USER, () => {
      let data = Object.assign({}, onboardingData);

      data.onboarding_status = onboardingStatus.CREDENTIALS;
      data.type = userRole.VIEW_ONLY;

      return JSON.stringify(data);
    });

    this.server.post(url.ONBOARD_USER_CREDENTIALS, (schema, request) => {
      let data = JSON.parse(request.requestBody);

      firstName = data.first_name;
      lastName = data.last_name;
      workPhone = data.work_phone;
    });

    await visit('/onboard/add-credentials');

    assert.dom('button[data-role=finish-onboarding]').isDisabled();
    assert.dom('section[data-role=trading-credentials]').doesNotExist();

    await fillIn('input[name=first-name]', 'Bob');
    await fillIn('input[name=last-name]', 'Barker');
    await fillIn('input[name=work-phone]', '2223334444');

    assert.dom('button[data-role=finish-onboarding]').isNotDisabled();

    await click('button[data-role=finish-onboarding]');

    assert.equal(firstName, 'Bob');
    assert.equal(lastName, 'Barker');
    assert.equal(workPhone, '2223334444');

    assert.equal(currentURL(), '/onboard/complete');
  });

  test('cleared user can see trading credentials', async function(assert) {
    this.server.get(url.ONBOARD_USER, () => {
      let data = Object.assign({}, onboardingData);

      data.onboarding_status = onboardingStatus.CREDENTIALS;
      data.type = userRole.CLEARED;

      return JSON.stringify(data);
    });

    await visit('/onboard/add-credentials');

    assert.dom('section[data-role=trading-credentials]').exists();
  });
});
