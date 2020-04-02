import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll, waitFor, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | notification/messages', function(hooks) {
  setupRenderingTest(hooks);

  let service;

  hooks.beforeEach(function() {
    service = this.owner.lookup('service:notification');
    service.delay.auto = 250;
  });

  hooks.afterEach(function() {
    service.clearAllMessages();
    service = null;
  });

  test('has messages', async function(assert) {
    await render(hbs`<Notification::Messages />`);

    await service.success('Message 1', { countdown: false });
    await service.success('Message 2', { countdown: false });

    await waitFor('[data-ui-component=notification-message]', {
      timeout: 250,
      count: 2,
    });

    assert.equal(
      findAll('[data-ui-component=notification-message]').length,
      2,
      'has 2 messages'
    );
  });

  test('countdown message', async function(assert) {
    await render(hbs`<Notification::Messages />`);

    await service.success('Message 1', { countdown: true });

    await waitFor('[data-ui-component=notification-message]', {
      timeout: 250,
      count: 1,
    });

    assert.dom('.__countdown').exists();

    await waitFor('[data-ui-component=notification-message]', {
      timeout: 5000,
      count: 0,
    });
  });

  test('remove message', async function(assert) {
    await render(hbs`<Notification::Messages />`);

    await service.success('Message 1', { countdown: false });

    await waitFor('[data-ui-component=notification-message]', {
      timeout: 250,
      count: 1,
    });

    assert.equal(
      findAll('[data-ui-component=notification-message]').length,
      1,
      'has a message'
    );

    await click('[data-role=close-success-message]');

    await waitUntil(() => findAll('[data-ui-component=notification-message]').length === 0);

    assert.equal(
      findAll('[data-ui-component=notification-message]').length,
      0,
      'has no message'
    );
  });
});
