import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Service | time', function(hooks) {
  setupTest(hooks);

  let time;
  let currentUser;

  hooks.beforeEach(function() {
    time = this.owner.lookup('service:time');
    currentUser = this.owner.lookup('service:currentUser');

    currentUser.timezone = 'America/New_York';
  });

  hooks.afterEach(function() {
    time.stop();

    time = null;
    currentUser = null;
  });

  test('timezone', function(assert) {
    let timezone = moment.tz(moment(), 'America/New_York').format('z');

    assert.equal(time.timezone, timezone);
  });

  test('offset', function(assert) {
    let offset = moment.tz(moment(), 'America/New_York').format('Z');

    assert.equal(time.offset, offset);
  });

  test('count', function(assert) {
    let now = moment().tz('America/New_York').format('HH:mm:ss');

    time.count();

    assert.equal(time.now, now);
  });

  test('start', function(assert) {
    time.start();

    assert.ok(time._interval);
  });

  test('stop', function(assert) {
    time.start();

    assert.ok(time._interval);

    time.stop();

    assert.notOk(time._interval);
  });
});
