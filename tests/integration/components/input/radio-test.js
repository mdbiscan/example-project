import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/radio', function(hooks) {
  setupRenderingTest(hooks);

  let groupValue;

  hooks.beforeEach(function() {
    groupValue = 'bar';
  });

  hooks.afterEach(function() {
    groupValue = null;
  });

  test('basic setup', async function(assert) {
    this.groupValue = groupValue;

    await render(hbs`
      <Input::Radio
        @name="foobar"
        @groupValue={{groupValue}}
        @label="Foo"
        @value="foo"
      />
    `);

    assert.dom('label').hasText('Foo');
    assert.dom('label').doesNotHaveClass('checked');
    assert.dom('input').isNotChecked();
    assert.equal(find('label').getAttribute('for'), find('input').id, 'label refers to input id');

    await click('label');

    assert.equal(this.groupValue, 'foo', 'value changed');
    assert.dom('input').isChecked();
  });

  test('selected by default', async function(assert) {
    this.groupValue = 'foo';

    await render(hbs`
      <Input::Radio
        @name="foobar"
        @groupValue={{groupValue}}
        @label="Foo"
        @value="foo"
      />
    `);

    assert.dom('label').hasClass('checked');
    assert.dom('input').isChecked();
  });

  test('selected by default', async function(assert) {
    this.groupValue = 'foo';

    await render(hbs`
      <Input::Radio
        @name="foobar"
        @groupValue={{groupValue}}
        @label="Foo"
        @value="foo"
      />
    `);

    assert.dom('label').hasClass('checked');
    assert.dom('input').isChecked();
  });

  test('disabled', async function(assert) {
    this.groupValue = 'bar';

    await render(hbs`
      <Input::Radio
        @name="foobar"
        @groupValue={{groupValue}}
        @label="Foo"
        @value="foo"
        @disabled={{true}}
      />
    `);

    assert.dom('label').hasClass('disabled');
    assert.dom('input').isDisabled();
  });
});
