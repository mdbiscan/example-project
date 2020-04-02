import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, waitFor, triggerEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | password reset', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('reset success', async function(assert) {
    await visit('/password-reset');

    assert.equal(currentURL(), '/password-reset');

    assert.dom('button[data-role=reset-password]').isDisabled();

    await fillIn('input[name=email]', 'admin@example.com');

    assert.dom('button[data-role=reset-password]').isNotDisabled();

    await click('button[data-role=reset-password]');

    assert.dom('[data-role=password-reset-success]');
  });

  test('reset error', async function(assert) {
    await visit('/password-reset');

    assert.equal(currentURL(), '/password-reset');

    assert.dom('button[data-role=reset-password]').isDisabled();

    await fillIn('input[name=email]', 'test@test.com');

    assert.dom('button[data-role=reset-password]').isNotDisabled();

    await click('button[data-role=reset-password]');

    await waitFor('[data-ui-component=notification-message]', {
      timeout: 250,
      count: 1,
    });

    assert.dom('[data-ui-component=notification-message]').exists();
  });

  test('validates user email on input focusout', async function(assert) {
    await visit('/password-reset');

    assert.equal(currentURL(), '/password-reset');

    await fillIn('input[name=email]', 'test');

    await triggerEvent('input[name=email]', 'focusout');

    assert.dom('[data-role=email-textbox-message]').exists();
  });

  test('can go back to login', async function(assert) {
    await visit('/password-reset');

    assert.equal(currentURL(), '/password-reset');

    await click('a[href="/login"]');

    assert.equal(currentURL(), '/login');
  });
});
