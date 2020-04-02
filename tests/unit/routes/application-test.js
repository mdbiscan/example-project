import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  test('willTransition', function(assert) {
    let route = this.owner.lookup('route:application');
    let notification = this.owner.lookup('service:notification');

    notification.error('test');

    assert.equal(
      notification.messages.length,
      1,
      'has notification errors'
    );

    route.send('willTransition');

    assert.equal(
      notification.messages.length,
      0,
      'removes notification errors'
    );
  });
});
