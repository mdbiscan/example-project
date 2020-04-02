import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | authenticated', function(hooks) {
  setupTest(hooks);

  let controller;

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:authenticated');
  });

  hooks.afterEach(function() {
    controller = null;
  });

  test('onLogout', async function(assert) {
    let session = this.owner.lookup('service:session');

    let invalidate = false;
    session.invalidate = () => {
      invalidate = true;
    };

    controller.send('onLogout');

    assert.ok(invalidate, 'invalidate');
  });
});
