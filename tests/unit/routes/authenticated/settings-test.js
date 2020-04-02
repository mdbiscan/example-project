import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | settings', function(hooks) {
  setupTest(hooks);

  test('willTransition', function(assert) {
    let route = this.owner.lookup('route:authenticated/settings');
    let tested = 0;

    route.context = {
      hasDirtyAttributes: true,
      rollbackAttributes: () => tested++
    };

    route.send('willTransition');

    assert.equal(tested, 1);
  });
});
