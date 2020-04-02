import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | site-header', function(hooks) {
  setupRenderingTest(hooks);

  let time;
  let onLogout;

  hooks.beforeEach(function() {
    time = this.owner.lookup('service:time');

    time.now = '12:25:15';

    time.currentUser = {
      timezone: 'America/New_York',
    };
  });

  hooks.afterEach(function() {
    time = null;
    onLogout = null;
  });

  test('it can toggle menu with button', async function(assert) {
    await render(hbs`<SiteHeader @onLogout={{onLogout}} />`);

    let menu = find('[data-role=main-menu]');
    let menuStyle = window.getComputedStyle(menu);

    assert.dom(menu).hasAttribute('aria-expanded', 'false');
    assert.dom(menu).hasStyle({ 'opacity': '0' });

    await click('button[data-role=toggle-menu]');

    assert.dom('button[data-role=toggle-menu]').hasClass('show');
    assert.dom(menu).hasAttribute('aria-expanded', 'true');

    await waitUntil(() =>  {
      return menuStyle.getPropertyValue('opacity') === '1';
    });

    assert.dom(menu).hasStyle({ 'opacity': '1' });
  });

  test('it can toggle menu with clickoutside', async function(assert) {
    await render(hbs`<SiteHeader @onLogout={{onLogout}} />`);

    let menu = find('[data-role=main-menu]');
    let menuStyle = window.getComputedStyle(menu);

    assert.dom(menu).hasAttribute('aria-expanded', 'false');
    assert.dom(menu).hasStyle({ 'opacity': '0' });

    await click('button[data-role=toggle-menu]');

    assert.dom('button[data-role=toggle-menu]').hasClass('show');
    assert.dom(menu).hasAttribute('aria-expanded', 'true');

    await waitUntil(() =>  {
      return menuStyle.getPropertyValue('opacity') === '1';
    });

    assert.dom(menu).hasStyle({ 'opacity': '1' });

    await click('#site-header');

    await waitUntil(() =>  {
      return menuStyle.getPropertyValue('opacity') === '0';
    });

    assert.dom(menu).hasStyle({ 'opacity': '0' });
  });

  test('it can logout', async function(assert) {
    let logout = false;
    onLogout = () => {
      logout = true;
    }

    this.onLogout = onLogout;

    await render(hbs`<SiteHeader @onLogout={{action onLogout}} />`);

    await click('[data-role=toggle-menu]');
    await click('button[data-role=logout]');

    assert.ok(logout);
  });

  test('it shows user time', async function(assert) {
    await render(hbs`<SiteHeader @onLogout={{onLogout}} />`);

    assert.dom('[data-role=system-time]').containsText('12:25:15');
    assert.dom('[data-role=timezone]').containsText('EDT');
  });
});
