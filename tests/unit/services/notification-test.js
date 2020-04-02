import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | notification', function(hooks) {
  setupTest(hooks);

  let service;

  hooks.beforeEach(function() {
    service = this.owner.lookup('service:notification');
  });

  hooks.afterEach(function() {
    service.toasts.clear();
    service.messages.clear();
    service = null;
  });

  test('addMessage', function(assert) {
    service = this.owner.lookup('service:notification');

    service.addMessage('test', 'error');
    service.addMessage('test', 'success');
    service.addMessage('test', 'info');

    assert.equal(service.messages.length, 3);
  });

  test('remove', function(assert) {
    service = this.owner.lookup('service:notification');

    service.addMessage('test', 'error');

    assert.equal(service.messages.length, 1);

    service.removeMessage(service.messages[0]);

    assert.equal(service.messages.length, 0);
  });

  test('error', function(assert) {
    service = this.owner.lookup('service:notification');

    service.error('test');

    let message = service.messages[0];

    assert.equal(message.text, 'test');
    assert.equal(message.type, 'error');
    assert.notOk(message.countdown);
  });

  test('info', function(assert) {
    service = this.owner.lookup('service:notification');

    service.info('test');

    let message = service.messages[0];

    assert.equal(message.text, 'test');
    assert.equal(message.type, 'info');
    assert.notOk(message.countdown);
  });

  test('success', function(assert) {
    service = this.owner.lookup('service:notification');

    service.success('test');

    let message = service.messages[0];

    assert.equal(message.text, 'test');
    assert.equal(message.type, 'success');
    assert.ok(message.countdown);
  });

  test('countdown message', function(assert) {
    service = this.owner.lookup('service:notification');

    service.success('test', { countdown: true });

    let message = service.messages[0];

    assert.ok(message.countdown);
  });

  test('clearAllMessages', function(assert) {
    service = this.owner.lookup('service:notification');

    service.addMessage('test', 'error');
    service.addMessage('test', 'success');
    service.addMessage('test', 'info');

    assert.equal(service.messages.length, 3);

    service.clearAllMessages();

    assert.equal(service.messages.length, 0);
  });

  test('clearErrors', function(assert) {
    service = this.owner.lookup('service:notification');

    service.addMessage('test', 'error');
    service.addMessage('test', 'error');
    service.addMessage('test', 'info');

    assert.equal(service.messages.length, 3);

    service.clearErrors();

    assert.equal(service.messages.length, 1);
  });

  test('addToast', function(assert) {
    service = this.owner.lookup('service:notification');

    service.addToast('test');
    service.addToast('test');

    assert.equal(service.toasts.length, 2);
  });

  test('removeToast', function(assert) {
    service = this.owner.lookup('service:notification');

    service.addToast('test');

    assert.equal(service.toasts.length, 1);

    let toast = service.toasts[0];

    service.removeToast(toast);

    assert.equal(service.toasts.length, 0);
  });

  test('toast', function(assert) {
    service = this.owner.lookup('service:notification');

    service.toast('test');

    assert.equal(service.toasts.length, 1);
  });
});
