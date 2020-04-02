import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('name and label', async function(assert) {
    await render(hbs`
      <Input::Checkbox
        @label="Test"
		    @name="test"
      />
    `);

    assert.dom('input').hasAttribute('type', 'checkbox');
    assert.dom('input').hasAttribute('name', 'test');
    assert.dom('label').hasText('Test');
    assert.dom('label').hasAttribute('for', find('input').id);
  });

  test('checked', async function(assert) {
    await render(hbs`
      <Input::Checkbox
        @label="Test"
        @name="test"
        @checked={{true}}
      />
    `);

    assert.dom('input').isChecked();
    assert.dom('label').hasClass('checked');
    assert.dom('svg.__checkmark').exists();
  });

  test('disabled', async function(assert) {
    await render(hbs`
      <Input::Checkbox
        @label="Test"
        @name="test"
        @disabled={{true}}
      />
    `);

    assert.dom('input').hasAttribute('disabled');
    assert.dom('label').hasClass('disabled');
  });

  test('with block', async function(assert) {
    await render(hbs`
      <Input::Checkbox
        @name="test"
        @readonly={{true}}
      >
        Testing!
      </Input::Checkbox>
    `);


    assert.dom('label').hasText('Testing!');
  });

  test('onClick', async function(assert) {
    assert.expect(1);

    let onClick = () => {
      assert.ok(true);
    };

    this.set('onClick', onClick);

    await render(hbs`
      <Input::Checkbox
        @label="Test"
        @checked={{true}}
        @name="test"

        @onClick={{action onClick}}
      />
    `);

    let input = find('input');

    triggerEvent(input, 'click');
  });
});
