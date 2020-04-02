import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | authenticated/settings', function(hooks) {
  setupTest(hooks);

  test('onUpdateSettings success', async function(assert) {
    let tested = 0;

    let controller = this.owner.lookup('controller:authenticated/settings');

    let notification = this.owner.lookup('service:notification');

    notification.success = () => {
      tested++;
    };

    controller.transitionToRoute = () => {};

    let event = {
      preventDefault() {
        tested++;
      }
    };

    controller.model = {
      save: () => {
        tested++;
      }
    };

    await controller.send('onUpdateSettings', event);

    assert.equal(tested, 3);
  });

  test('onUpdateSettings error', async function(assert) {
    let tested = 0;

    let controller = this.owner.lookup('controller:authenticated/settings');

    let notification = this.owner.lookup('service:notification');
    notification.error = () => {
      tested++;
    };

    let event = {
      preventDefault() {
        tested++;
      }
    };

    controller.model = {
      save: () => {
        throw { error: 'test' };
      }
    };

    await controller.send('onUpdateSettings', event);

    assert.equal(tested, 2);
  });
});
