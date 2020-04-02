import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | onboard', function(hooks) {
  setupTest(hooks);

  let route;
  let onboarding;

  hooks.beforeEach(function() {
    route = this.owner.lookup('route:onboard');
    onboarding = this.owner.lookup('service:onboarding');
  });

  hooks.afterEach(function() {
    route = null;
  });

  test('model', async function(assert) {
    onboarding.token = '1234';

    let loadToken;
    onboarding.loadToken = () => {
      loadToken = true;
    }

    let load;
    onboarding.load = () => {
      load = true;
    };

    await route.model();

    assert.ok(loadToken, 'token loaded');
    assert.ok(load, 'onboarding loaded');
  });

  test('redirect to login', async function(assert) {
    let routed;

    route.transitionTo = (transition) => {
      routed = transition;
    };

    onboarding.data = {
      onboardingStatus: null,
    };

    await route.redirect();

    assert.equal(routed, 'login');

    onboarding.data = {
      onboardingStatus: 'TokenUnavailable',
    };

    await route.redirect();

    assert.equal(routed, 'login');
  });

  test('redirect to onboard.start', async function(assert) {
    let routed;

    route.transitionTo = (transition) => {
      routed = transition;
    };

    onboarding.data = {
      onboardingStatus: 'PASSWORD',
    };

    await route.redirect();

    assert.equal(routed, 'onboard.start');
  });

  test('redirect to onboard.add-credentials', async function(assert) {
    let routed;

    route.transitionTo = (transition) => {
      routed = transition;
    };

    onboarding.data = {
      onboardingStatus: 'CREDENTIALS',
    };

    await route.redirect();

    assert.equal(routed, 'onboard.add-credentials');
  });
});
