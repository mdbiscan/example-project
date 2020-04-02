import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import session from '../../../mirage/fixtures/session';

module('Unit | Service | current-user', function(hooks) {
  setupTest(hooks);

  let store;

  hooks.beforeEach(function() {
    store = {
      findRecord() {
        return {
          email: 'test@test.test'
        };
      }
    };
  });

  hooks.afterEach(function() {
    store = null;
  });

  test('load', async function(assert) {
    let service = this.owner.lookup('service:current-user');

    service.store = store;
    service.session = session;

    await service.load();

    assert.equal(service.user.email, 'test@test.test');
  });

  test('settings', async function(assert) {
    let service = this.owner.lookup('service:current-user');

    service.user = { setting: { orderConfirmation: true } };

    let settings = service.settings;

    assert.equal(settings.orderConfirmation,true);
  });
});
