import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('user can log in', async function(assert) {
    this.server.create('user', {
      email: 'admin@example.com',
    });

    await visit('/login');

    assert.equal(currentURL(), '/login');

    assert.dom('button[data-role=login]').isDisabled();

    await fillIn('input[name=email]', 'admin@example.com');
    await fillIn('input[name=password]', 'Password123!');

    assert.dom('button[data-role=login]').isNotDisabled();

    await click('button[data-role=login]');

    assert.equal(currentURL(), '/');
  });

  test('invalid user cannot log in', async function(assert) {
    await visit('/login');

    assert.equal(currentURL(), '/login');

    await fillIn('input[name=email]', 'test@example.com');
    await fillIn('input[name=password]', '1234');

    await click('button[data-role=login]');

    await waitFor('[data-ui-component=notification-message]', {
      timeout: 250,
      count: 1,
    });

    assert.dom('[data-ui-component=notification-message]').exists();
  });

  test('can go to reset password', async function(assert) {
    await visit('/login');

    assert.equal(currentURL(), '/login');

    await click('a[href="/password-reset"]');

    assert.equal(currentURL(), '/password-reset');
  });
});
