import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, findAll, triggerEvent, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dropdown', function(hooks) {
  setupRenderingTest(hooks);

  let options = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
  ];

  test('it has options', async function(assert) {
    this.options = options;

    await render(hbs`
      <Dropdown
        @label="Test"
        @options={{options}}
        @value={{value}}
      />
    `);

    assert.dom('.__select-box__selected-option').containsText('Choose Option');
    assert.dom('[data-role=dropdown-label]').containsText('Test');
    assert.dom('.__select-box__option').exists({ count: 4 });
  });

  test('it selects option', async function(assert) {
    this.options = options;

    await render(hbs`
      <Dropdown
        @label="Sort By"
        @value={{value}}
        @options={{options}}
      />
    `);

    await click('.__select-box__selected-option');

    assert.dom('.__select-box__options').isVisible();

    let option = findAll('.__select-box__option')[1];

    await click(option);

    assert.equal(this.value, '1');
    assert.dom('.__select-box__options').isNotVisible();
  });

  test('it can have a selected value on render', async function(assert) {
    this.options = options;
    this.value = '1';

    await render(hbs`
      <Dropdown
        @label="Sort By"
        @value={{value}}
        @options={{options}}
      />
    `);

    assert.dom('.__select-box__selected-option').containsText('Option 1');
  });

  test('it toggles option list with keyboard', async function(assert) {
    this.options = options;

    await render(hbs`
      <Dropdown
        @label="Sort By"
        @value={{value}}
        @options={{options}}
      />
    `);

    await triggerKeyEvent('.__select-box', 'keydown', 'Enter');

    assert.dom('.__select-box__options').isVisible();

    await triggerEvent('.__select-box', 'focusout');

    assert.dom('.__select-box__options').isNotVisible();
  });

  test('it selects option with keyboard', async function(assert) {
    this.options = options;

    await render(hbs`
      <Dropdown
        @label="Sort By"
        @value={{value}}
        @options={{options}}
      />
    `);

    await triggerKeyEvent('.__select-box', 'keydown', 'Enter');
    // Selects default
    await triggerKeyEvent('.__select-box', 'keydown', 'ArrowDown')
    // Selects first option
    await triggerKeyEvent('.__select-box', 'keydown', 'ArrowDown')

    assert.dom('.__select-box__option--active').exists();
    assert.dom('.__select-box__option--active').containsText('Option 1');

    await triggerKeyEvent('.__select-box', 'keydown', 'Enter');

    assert.equal(this.value, '1');

    await triggerKeyEvent('.__select-box', 'keydown', 'Escape');

    assert.dom('.__select-box__options').isNotVisible();
  });
});
