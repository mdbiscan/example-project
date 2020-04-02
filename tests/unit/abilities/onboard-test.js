import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import userRole from 'example/types/user-role';

module('Unit | Ability | onboard', function(hooks) {
  setupTest(hooks);

  test('canViewTradingCredentialsDuring', function(assert) {
    let onboarding = this.owner.lookup('service:onboarding');

    onboarding.data = {
      type: userRole.CLEARED,
    };

    let ability = this.owner.lookup('ability:onboard');

    assert.ok(ability.canViewTradingCredentialsDuring);
  });
});
