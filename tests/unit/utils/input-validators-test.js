import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {
  validateContainsLowerCase,
  validateContainsNumber,
  validateContainsUpperCase,
  validateEmail,
  validateLength,
  validatePhoneNumber,
} from 'example/utils/input-validators';

module('Unit | Utils | input-validators', function(hooks) {
  setupTest(hooks);

  test('validate email', function(assert) {
    let email = 'admin@example.com';

    assert.ok(validateEmail(email));
  });

  test('invalidate email', function(assert) {
    let email = 'admin';

    assert.notOk(validateEmail(email));
  });

  test('validate length', function(assert) {
    let value = '12345678';

    assert.ok(validateLength(value, 8));
  });

  test('invalidate length', function(assert) {
    let value = '12345678';

    assert.notOk(validateLength(value, 10));
  });

  test('validate contains number', function(assert) {
    let value = 'abcdefe1';

    assert.ok(validateContainsNumber(value));
  });

  test('invalidate contains number', function(assert) {
    let value = 'abcdeere';

    assert.notOk(validateContainsNumber(value));
  });

  test('validte contains upperCase', function(assert) {
    let value = 'abcdefe1A';

    assert.ok(validateContainsUpperCase(value));
  });

  test('invalidate contains upperCase', function(assert) {
    let value = 'abcdeere';

    assert.notOk(validateContainsUpperCase(value));
  });

  test('validate contains lowerCase', function(assert) {
    let value = 'abcdefe1A';

    assert.ok(validateContainsLowerCase(value));
  });

  test('invalidate contains lowerCase', function(assert) {
    let value = '1234A';

    assert.notOk(validateContainsLowerCase(value));
  });

  test('validate phone number (888) 999-4444', function(assert) {
    let value = '(888) 999-4444';

    assert.ok(validatePhoneNumber(value));
  });

  test('validate phone number 888-999-4444', function(assert) {
    let value = '888-999-4444';

    assert.ok(validatePhoneNumber(value));
  });

  test('validate phone number 8889994444', function(assert) {
    let value = '8889994444';

    assert.ok(validatePhoneNumber(value));
  });

  test('invalidate phone number', function(assert) {
    let value = '(888) 999-4455 ext. 123';

    assert.notOk(validatePhoneNumber(value));
  });
});
