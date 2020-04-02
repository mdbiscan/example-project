import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | password-update', function(hooks) {
  setupTest(hooks);

  let controller;

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:password-update');
  });

  hooks.afterEach(function() {
    controller = null;
  });

  test('isUpdateBtnEnabled', function(assert) {
    let passwordManager = this.owner.lookup('service:password-manager');

    assert.notOk(controller.isUpdateBtnEnabled);

    passwordManager.password = '123456aZdt';
    passwordManager.passwordConfirmation = '123456aZdt';

    assert.ok(controller.isUpdateBtnEnabled);
  });

  test('onCheckPasswordMatch', function(assert) {
    let passwordManager = this.owner.lookup('service:password-manager');

    passwordManager.password = 'abc123DEF';
    passwordManager.passwordConfirmation = 'abc123DEF';

    controller.send('onCheckPasswordMatch');

    assert.ok(passwordManager.passwordConfirmationSuccess);
    assert.notOk(passwordManager.passwordConfirmationError);
  });

  test('onCreatePassword success', async function(assert) {
    let tested = 0;

    let passwordManager = this.owner.lookup('service:password-manager');
    passwordManager.updatePassword = () => {
      tested++;
    };

    let notification = this.owner.lookup('service:notification');
    notification.success = () => {
      tested++;
    };

    let event = {
      preventDefault() {
        tested++;
      },
    };

    passwordManager.password = 'abc123DEF';
    passwordManager.passwordConfirmation = 'abc123DEF';

    await controller.send('onCreatePassword', event);

    assert.equal(tested, 3);
  });

  test('onCreatePassword error', async function(assert) {
    let tested = 0;

    let passwordManager = this.owner.lookup('service:password-manager');
    passwordManager.updatePassword = () => {
      throw 'test';
    };

    let notification = this.owner.lookup('service:notification');
    notification.error = () => {
      tested++;
    };

    let event = {
      preventDefault() {},
    };

    passwordManager.password = 'abc123DEF';
    passwordManager.passwordConfirmation = 'abc123DEF';

    await controller.send('onCreatePassword', event);

    assert.equal(tested, 1);
  });
});
