import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | onboard/create-password', function(hooks) {
  setupTest(hooks);

  let controller;

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:onboard/create-password');
  });

  hooks.afterEach(function() {
    controller = null;
  });

  test('isUpdateBtnEnabled', function(assert) {
    let passwordManager = this.owner.lookup('service:password-manager');

    assert.notOk(controller.isUpdateBtnEnabled);

    passwordManager.password = '123456aZdt';
    passwordManager.passwordConfirmation = '123456aZdt';
    controller.hasAcceptedTerms = true;

    assert.ok(controller.isUpdateBtnEnabled);
  });

  test('onCheckPasswordMatch success', function(assert) {
    let passwordManager = this.owner.lookup('service:password-manager');

    passwordManager.password = 'abc123DEF';
    passwordManager.passwordConfirmation = 'abc123DEF';

    controller.send('onCheckPasswordMatch');

    assert.ok(passwordManager.passwordConfirmationSuccess);
    assert.notOk(passwordManager.passwordConfirmationError);
  });

  test('onCreatePassword success', async function(assert) {
    let tested = 0;

    let onboarding = this.owner.lookup('service:onboarding');
    onboarding.sendPassword = () => {
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

    controller.password = 'abc123DEF123';
    controller.passwordConfirmation = 'abc123DEF123';

    await controller.send('onCreatePassword', event);

    assert.equal(tested, 3);
  });

  test('onCreatePassword error', async function(assert) {
    let tested = 0;

    let onboarding = this.owner.lookup('service:onboarding');
    onboarding.sendPassword = () => {
      throw 'test';
    };

    let notification = this.owner.lookup('service:notification');
    notification.error = () => {
      tested++;
    };

    let event = {
      preventDefault() {},
    };

    controller.password = 'abc123DEF';
    controller.passwordConfirmation = 'abc123DEF';

    await controller.send('onCreatePassword', event);

    assert.equal(tested, 1);
  });
});
