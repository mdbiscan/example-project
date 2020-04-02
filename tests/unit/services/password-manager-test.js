import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import Response from 'ember-cli-mirage/response';
import url from 'example/types/url';

module('Unit | Service | password-manager', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  let passwordManager;

  hooks.beforeEach(function() {
    passwordManager = this.owner.lookup('service:password-manager');
  });

  hooks.afterEach(function() {
    passwordManager = null;
  });

  test('hasMinimumCharacters', function(assert) {
    passwordManager.password = 'abc';

    assert.notOk(passwordManager.hasMinimumCharacters);

    passwordManager.password = 'abc123def456';

    assert.ok(passwordManager.hasMinimumCharacters);
  });

  test('isValidPassword', function(assert) {
    passwordManager.password = '523d';

    assert.notOk(passwordManager.isValidPassword);

    passwordManager.password = 'abc123DEF456';

    assert.ok(passwordManager.isValidPassword);
  });


  test('checkPasswordMatch', async function(assert) {
    passwordManager.password = 'abc123DEF';
    passwordManager.passwordConfirmation = 'abc123DEF4'

    await passwordManager.checkPasswordMatch();

    assert.notOk(passwordManager.passwordConfirmationSuccess);
    assert.ok(passwordManager.passwordConfirmationError);

    passwordManager.passwordConfirmation = 'abc123DEF';

    await passwordManager.checkPasswordMatch();

    assert.ok(passwordManager.passwordConfirmationSuccess);
    assert.notOk(passwordManager.passwordConfirmationError);
  });

  test('updatePassword success', async function(assert) {
    let response;

    this.server.put(url.USER_PASSWORD, function(schema, request) {
      response = JSON.parse(request.requestBody);

      return new Response(200, {}, {});
    });

    passwordManager.password = 'abc123DEF';
    passwordManager.passwordConfirmation = 'abc123DEF';

    await passwordManager.updatePassword();

    assert.deepEqual(response, {
      user: {
        password: 'abc123DEF',
        password_confirmation: 'abc123DEF',
      }
    });
  });

  test('updatePassword error', async function(assert) {
    passwordManager.password = 'abc123DEF';
    passwordManager.passwordConfirmation = 'abc123DEF';

    try {
      await passwordManager.updatePassword();
    } catch (error) {
      // TODO: this is to capture the message temporarily
      // PR #42
      assert.deepEqual(error.message, 'Your password could not be reset.');
    }
  });
});
