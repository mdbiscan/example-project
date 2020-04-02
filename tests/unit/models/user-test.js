import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  test('isAdmin', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', { 
      type: 'AdminUser',
    });

    assert.ok(model.isAdmin);
    assert.notOk(model.isCleared);
    assert.notOk(model.isViewOnly);
  });

  test('isCleared', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', { 
      type: 'ClearedUser',
    });

    assert.notOk(model.isAdmin);
    assert.ok(model.isCleared);
    assert.notOk(model.isViewOnly);
  });

  test('isViewOnly', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', { 
      type: 'ViewonlyUser',
    });

    assert.notOk(model.isAdmin);
    assert.notOk(model.isCleared);
    assert.ok(model.isViewOnly);
  });
});
