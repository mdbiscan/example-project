import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | settings', function(hooks) {
  setupTest(hooks);

  let controller;

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:authenticated/settings');
  });

  hooks.afterEach(function() {
    controller = null;
  });

  test('isUpdateDisabled true', function(assert) {
    controller.model = {
      hasDirtyAttributes: false,
    };

    assert.ok(controller.isUpdateDisabled, 'disabled');

    controller.model.hasDirtyAttributes = true;

    assert.notOk(controller.isUpdateDisabled, 'enabled');
  });

  test('timezoneOptions', function(assert) {
    let values = controller.timezoneOptions.mapBy('value');
    let labels = controller.timezoneOptions.mapBy('label');

    assert.deepEqual(values, [
      'System',
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
    ]);

    assert.ok(labels[0].includes('My Location'), 'System');
    assert.ok(labels[1].includes('EDT'), 'EDT');
    assert.ok(labels[2].includes('CDT'), 'CDT');
    assert.ok(labels[3].includes('MDT'), 'MDT');
    assert.ok(labels[4].includes('PDT'), 'PDT');
  });

  test('onUpdateSettings success', async function(assert) {
    let notification = this.owner.lookup('service:notification');

    let success;
    notification.success = (message) => {
      success = message;
    }

    let saved;
    controller.model = {
      save() {
        saved = true;
      },
    };

    let prevented;
    let event = {
      preventDefault() {
        prevented = true;
      },
    }

    await controller.send('onUpdateSettings', event);

    assert.ok(prevented, 'event prevents');
    assert.ok(saved, 'model saved');
    assert.equal(success, 'Your settings have been saved.', 'notification message');
  });

  test('onUpdateSettings error', async function(assert) {
    let notification = this.owner.lookup('service:notification');

    let error;
    notification.error = (message) => {
      error = message;
    }

    controller.model = {
      save() {
        throw 'test';
      },
    };

    let prevented;
    let event = {
      preventDefault() {
        prevented = true;
      },
    }

    await controller.send('onUpdateSettings', event);

    assert.ok(prevented, 'event prevents');
    assert.equal(error, 'test', 'notification error');
  });
});
