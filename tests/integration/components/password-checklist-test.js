import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | password-checklist', function(hooks) {
  setupRenderingTest(hooks);

  let passwordManager;

  hooks.beforeEach(function() {
    passwordManager = this.owner.lookup('service:password-manager');
  });

  hooks.afterEach(function() {
    passwordManager = null;
  });

  test('hasMinimumCharacters false', async function(assert) {
    passwordManager.password = '123456';
    passwordManager.passwordConfirmation = '123456';

    await render(hbs`<PasswordChecklist />`);

    assert.dom('[data-role=has-minimum-characters] span').hasClass('text-gray-600');
    assert.dom('[data-role=has-minimum-characters] svg').hasClass('fill-gray-600');
  });

  test('hasMinimumCharacters true', async function(assert) {
    passwordManager.password = '1234567890';
    passwordManager.passwordConfirmation = '1234567890';

    await render(hbs`<PasswordChecklist />`);

    assert.dom('[data-role=has-minimum-characters] span').hasClass('text-green-500');
    assert.dom('[data-role=has-minimum-characters] svg').hasClass('fill-green-500');
  });
});
