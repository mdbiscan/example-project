import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input/radio-group', function(hooks) {
  setupRenderingTest(hooks);

  test('renders radio button components', async function(assert) {
    this.radioValue = 'foo';

    await render(hbs`
      <Input::RadioGroup
        @value={{radioValue}}
        @name="foobar"
        as |Group|
      >
        <Group.Radio
          @label="Foo"
          @value="foo"
        />
        <Group.Radio
          @label="Bar"
          @value="bar"
        />
      </Input::RadioGroup>
    `);

    let radios = findAll('[data-ui-component=input-radio] input[type=radio]');

    assert.equal(radios.length, '2');

    assert.ok(radios[0].checked, 'foo is checked');
    assert.notOk(radios[1].checked, 'bar is not checked');

    await click(radios[1]);

    assert.equal(this.radioValue, 'bar', 'value is changed');
    assert.notOk(radios[0].checked, 'foo is not checked');
    assert.ok(radios[1].checked, 'bar is checked');
  });

  test('disabled', async function(assert) {
    this.radioValue = 'foo';

    await render(hbs`
      <Input::RadioGroup
        @value={{radioValue}}
        @name="foobar"
        @disabled={{true}}
        as |Group|
      >
        <Group.Radio
          @label="Foo"
          @value="foo"
        />
        <Group.Radio
          @label="Bar"
          @value="bar"
        />
      </Input::RadioGroup>
    `);

    let radios = findAll('[data-ui-component=input-radio] input[type=radio]');

    assert.dom(radios[0]).isDisabled();
    assert.dom(radios[1]).isDisabled();
  });
});
