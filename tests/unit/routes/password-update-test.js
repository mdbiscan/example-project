import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { visit, currentURL } from '@ember/test-helpers';

module('Unit | Route | password-update', function(hooks) {
  setupTest(hooks);

  let route;
  let passwordManager;

  hooks.beforeEach(function() {
    route = this.owner.lookup('route:password-update');
    passwordManager = this.owner.lookup('service:passwordManager');
  });

  hooks.afterEach(function() {
    route = null;
  });

  test('model', async function(assert) {
    let tested = 0;

    passwordManager.loadToken = () => {
      tested++;
    };

    await route.model();

    assert.equal(tested, 1);
  });

  test('redirect to login when toke in null', async function(assert) {
    passwordManager.token = null;

    await visit('/password-update');

    assert.equal(currentURL(), '/login');
  });

  test('route to passwork-update when token is not null', async function(assert) {
    passwordManager.token = 'fakeToken';

    await visit('/password-update');

    assert.equal(currentURL(), '/password-update');
  });
});
