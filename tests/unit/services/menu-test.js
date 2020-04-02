import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | menu', function(hooks) {
  setupTest(hooks);

  let menu;

  hooks.beforeEach(function() {
    menu = this.owner.lookup('service:menu');
  });

  hooks.afterEach(function() {
    menu = null;
  });

  test('open', function(assert) {
    assert.notOk(menu.show, 'closed');

    menu.open();

    assert.ok(menu.show, 'open');
  });

  test('close', function(assert) {
    menu.show = true;

    assert.ok(menu.show, 'open');

    menu.close();

    assert.notOk(menu.show, 'closed');
  });

  test('toggle', function(assert) {
    assert.notOk(menu.show, 'closed');

    menu.toggle();

    assert.ok(menu.show, 'open');

    menu.toggle();

    assert.notOk(menu.show, 'closed');
  });
});
