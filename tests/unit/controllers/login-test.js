import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | login', function(hooks) {
  setupTest(hooks);

  let controller;

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:login');
  });

  hooks.afterEach(function() {
    controller = null;
  });

  test('isLoginDisabled', function(assert) {
    assert.ok(controller.isLoginDisabled, 'no email or password');

    controller.email = 'test@test';
    controller.password = 'password';

    assert.ok(controller.isLoginDisabled, 'invalid email with password');

    controller.email = 'test@test.com';

    assert.notOk(controller.isLoginDisabled, 'email and password');
  });

  test('isValidEmail', function(assert) {
    controller.email = 'test@test';

    assert.notOk(controller.isValidEmail, 'email is not valid');

    controller.email = 'test@test.com';

    assert.ok(controller.isValidEmail, 'email is valid');
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
