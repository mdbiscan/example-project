import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll, waitFor, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | notification/toasts', function(hooks) {
  setupRenderingTest(hooks);

  let service;

  hooks.beforeEach(function() {
    service = this.owner.lookup('service:notification');
    service.delay.auto = 250;
  });

  hooks.afterEach(function() {
    service.toasts.clear();
    service = null;
  });

  test('has toasts', async function(assert) {
    await render(hbs`<Notification::Toasts />`);

    await service.toast('Message 1', { countdown: false });
    await service.toast('Message 2', { countdown: false });

    await waitFor('[data-ui-component=notification-toast]', {
      timeout: 250,
      count: 2,
    });

    assert.equal(
      findAll('[data-ui-component=notification-toast]').length,
      2,
      'has 2 toasts'
    );
  });

  test('countdown toast', async function(assert) {
    await render(hbs`<Notification::Toasts />`);

    await service.toast('Message 1', { countdown: true });

    await waitFor('[data-ui-component=notification-toast]', {
      timeout: 250,
      count: 1,
    });

    assert.dom('[data-ui-component=notification-toast]').exists();

    await waitFor('[data-ui-component=notification-toast]', {
      timeout: 5000,
      count: 0,
    });

    assert.dom('[data-ui-component=notification-toast]').doesNotExist();
  });

  test('dismiss toast', async function(assert) {
    await render(hbs`<Notification::Toasts />`);

    await service.toast('Message 1', { countdown: false });

    await waitFor('[data-ui-component=notification-toast]', {
      timeout: 250,
      count: 1,
    });

    assert.equal(
      findAll('[data-ui-component=notification-toast]').length,
      1,
      'has a toast'
    );

    await click('[data-role=dismiss-toast]');

    await waitUntil(() => findAll('[data-ui-component=notification-toast]').length === 0);

    assert.equal(
      findAll('[data-ui-component=notification-toast]').length,
      0,
      'has no message'
    );
  });
});
