import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | onboard/add-credentials', function(hooks) {
  setupTest(hooks);

  let controller;

  hooks.beforeEach(function() {
    controller = this.owner.lookup('controller:onboard/add-credentials');
  });

  hooks.afterEach(function() {
    controller = null;
  });

  test('isSubmitDisabled', function(assert) {
    assert.ok(controller.isSubmitDisabled);

    controller.firstName = 'First';
    controller.lastName = 'Last';
    controller.workPhone = '2223334444-44';

    assert.ok(controller.isSubmitDisabled, 'invalid phone');

    controller.workPhone = '2223334444';

    assert.notOk(controller.isSubmitDisabled, 'phone, first, last');
  });

  test('isValidWorkPhone', function(assert) {
    assert.notOk(controller.isValidWorkPhone);

    controller.workPhone = '2223334444';

    assert.ok(controller.isValidWorkPhone);
  });

  test('onUpdateCredentials success', async function(assert) {
    let tested = 0;

    let onboarding = this.owner.lookup('service:onboarding');
    onboarding.sendCredentials = () => {
      tested++;
    };
    onboarding.clearToken = () => {
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

    controller.firstName = 'firstName';
    controller.lastName = 'firstName';
    controller.workPhone = '2223334444';

    await controller.send('onUpdateCredentials', event);

    assert.equal(tested, 4);
  });

  test('onUpdateCredentials invalid workPhone', async function(assert) {
    let event = {
      preventDefault() {},
    };

    controller.workPhone = '222';

    assert.notOk(controller.workPhoneError);

    await controller.send('onValidatePhoneNumber', event);

    assert.ok(controller.workPhoneError);
  });

  test('onUpdateCredentials error', async function(assert) {
    let tested = false;

    let event = {
      preventDefault() {},
    };

    let onboarding = this.owner.lookup('service:onboarding');
    onboarding.sendCredentials = () => {
      throw 'test';
    };

    let notification = this.owner.lookup('service:notification');
    notification.error = () => {
      tested = true;
    };

    controller.firstName = 'firstName';
    controller.lastName = 'firstName';
    controller.workPhone = '2223334444';

    await controller.send('onUpdateCredentials', event);

    assert.ok(tested);
  });
});
