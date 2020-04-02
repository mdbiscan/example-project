import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | password-reset', function(hooks) {
  setupTest(hooks);

  let controller;

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:login');
  });

  hooks.afterEach(function() {
    controller = null;
  });

  test('isResetDisabled', function(assert) {
    assert.ok(controller.isLoginDisabled, 'no email');

    controller.email = 'test@test';

    assert.ok(controller.isLoginDisabled, 'invalid email');

    controller.email = 'test@test.com';

    assert.ok(controller.isLoginDisabled, 'email');
  });

  test('isValidEmail', function(assert) {
    controller.email = 'test@test';

    assert.notOk(controller.isValidEmail, 'invalid');

    controller.email = 'test@test.com';

    assert.ok(controller.isLoginDisabled, 'valid');
  });

  test('onValidateEmail', function(assert) {
    controller.email = 'test@test';

    controller.send('onValidateEmail');

    assert.ok(controller.emailError, 'error');

    controller.email = 'test@test.com';

    controller.send('onValidateEmail');

    assert.notOk(controller.emailError, 'no error');
  });
});
