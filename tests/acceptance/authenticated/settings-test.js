import { module, test } from 'qunit';
import { visit, currentURL, click, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | authenticated/settings', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    this.server.create('user', {
      email: 'admin@example.com'
    });
  });

  test('visiting /settings when user is not authenticated, should take to login page', async function(assert) {
    await visit('/settings');

    assert.equal(currentURL(), '/login');
  });

  test('visiting /settings should render /settings page', async function(assert) {
    await authenticateSession({
      authToken: '12345',
      tokenData: {
        sub: 1
      }
    });

    await visit('/settings');
    assert.equal(currentURL(), '/settings');
  });

  test('change order-confirmation setting and click on update-settings button.sucess message should appear', async function(assert) {
    await authenticateSession({
      authToken: '12345',
      tokenData: {
        sub: 1
      }
    });

    await visit('/settings');

    await click('input[name=order-confirmation]');

    await click('button[data-role=update-settings]');

    await waitFor('[data-ui-component=notification-message]', {
      timeout: 250,
      count: 1
    });

    assert.dom('[data-ui-component=notification-message]').exists();
  });
});
