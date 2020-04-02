import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | authenticated', function(hooks) {
  setupTest(hooks);

  let route;

  hooks.beforeEach(function() {
    route = this.owner.lookup('route:authenticated');
  });

  hooks.afterEach(function() {
    route = null;
  });

  test('willTransition', function(assert) {
    let menu = this.owner.lookup('service:menu');

    menu.open();

    assert.ok(menu.show, 'menu open');

    route.send('willTransition');

    assert.notOk(menu.show, 'menu closed');
  });

  test('activate', function(assert) {
    let time = this.owner.lookup('service:time');

    route.send('activate');

    assert.ok(time._interval, 'time started');

    time.stop();
  });

  test('deactive', function(assert) {
    let time = this.owner.lookup('service:time');

    route.send('activate');

    assert.ok(time._interval, 'time started');

    route.send('deactivate');

    assert.notOk(time._interval, 'time stopped');
  });
});
