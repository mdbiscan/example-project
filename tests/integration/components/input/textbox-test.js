import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, fillIn, triggerEvent, waitUntil } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/textbox', function(hooks) {
  setupRenderingTest(hooks);

  test('name and label required', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
      />
    `);

    let label = find('label');
    let input = find('input');

    assert.dom('input').hasAttribute('type', 'text');
    assert.dom('input').hasAttribute('name', 'test');
    assert.dom('label').hasText('Test Input');
    assert.dom('input').hasAttribute('placeholder', 'Test Input');
    assert.equal(
      label.getAttribute('for'),
      input.id,
      'label points to input id'
    );
  });

  test('value updates', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @value="Foo bar"
      />
    `);

    let input = find('input');

    await fillIn(input, 'Foo bar');

    assert.dom('input').hasValue('Foo bar');
  });

  test('type', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @type="number"
      />
    `);

    assert.dom('input').hasAttribute('type', 'number');
  });

  test('readonly', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @readonly={{true}}
      />
    `);

    assert.dom('input').hasAttribute('readonly');
    assert.dom('.input-textbox-component').hasClass('readonly');
  });

  test('disabled', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @disabled={{true}}
      />
    `);

    assert.dom('input').hasAttribute('disabled');
    assert.dom('.input-textbox-component').hasClass('disabled');
  });

  test('success', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @success={{true}}
        @message="Success!"
      />
    `);

    assert.dom('.input-textbox-component').hasClass('success');
    assert.dom('.__message').hasText('Success!');
  });

  test('error', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @error={{true}}
        @message="Error!"
      />
    `);

    assert.dom('.input-textbox-component').hasClass('error');
    assert.dom('.__message').hasText('Error!');
  });

  test('with-icon', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @icon="test"
      />
    `);

    assert.dom('svg.__icon').exists();
  });

  test('key-up', async function(assert) {
    let test = false;

    let onKeyUp = () => {
      test = true;
    };

    this.set('onKeyUp', onKeyUp);

    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @onKeyUp={{action onKeyUp}}
      />
    `);

    let input = find('input');

    triggerEvent(input, 'keyup');

    await waitUntil(() => test === true);

    assert.ok(test);
  });

  test('key-press', async function(assert) {
    let test = false;

    let onKeyPress = () => {
      test = true;
    };

    this.set('onKeyPress', onKeyPress);

    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @onKeyPress={{action onKeyPress}}
      />
    `);

    let input = find('input');

    triggerEvent(input, 'keypress');

    await waitUntil(() => test === true);

    assert.ok(test);
  });

  test('focus-in', async function(assert) {
    assert.expect(1);

    let onFocusIn = () => {
      assert.ok(true);
    };

    this.set('onFocusIn', onFocusIn);

    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @onFocusIn={{action onFocusIn}}
      />
    `);

    let input = find('input');

    triggerEvent(input, 'focusin');
  });

  test('focus-out', async function(assert) {
    assert.expect(1);

    let onFocusOut = () => {
      assert.ok(true);
    };

    this.set('onFocusOut', onFocusOut);

    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @onFocusOut={{action onFocusOut}}
      />
    `);

    let input = find('input');

    triggerEvent(input, 'focusout');
  });

  test('full-width', async function(assert) {
    await render(hbs`
      <Input::Textbox
        @name="test"
        @label="Test Input"
        @full={{true}}
      />
    `);

    assert.dom('.input-textbox-component').hasClass('full-width');
  });
});
