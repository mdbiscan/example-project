import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('props', async function(assert) {
    await render(hbs`
      <Toggle
        @class="m-8"
        @checked={{checked}}
        @label="test"
      />
    `);

    assert.dom('.toggle-component').hasClass('m-8');
    assert.dom('.__text').containsText('test');
    assert.dom('input').hasAttribute('name', 'test');
  });

  test('is checkable', async function(assert) {
    await render(hbs`
      <Toggle
        @class="m-8"
        @checked={{checked}}
        @label="test"
      />
    `);

    assert.dom('input').isNotChecked();

    await click('.toggle-component');

    assert.dom('input').isChecked();
    assert.dom('.toggle-component').hasClass('checked');
  });

  test('disabled', async function(assert) {
    await render(hbs`
      <Toggle
        @class="m-8"
        @checked={{checked}}
        @label="test"
        @disabled={{true}}
      />
    `);

    assert.dom('input').isDisabled();
    assert.dom('.toggle-component').hasClass('disabled');
  });

  test('role', async function(assert) {
    await render(hbs`
      <Toggle
        @class="m-8"
        @checked={{checked}}
        @label="test"
        @role="test"
      />
    `);

    assert.dom('.toggle-component').hasAttribute('data-role', 'test');
  });
});
