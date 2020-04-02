import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | button', function(hooks) {
  setupRenderingTest(hooks);

  test('primary with click event', async function(assert) {
    assert.expect(5);

    let onClick = () => {
      assert.ok(true);
    };

    this.set('onClick', onClick);

    await render(hbs`
      <Button @onClick={{action onClick}}>
        Test
      </Button>
    `);

    await click('button');

    assert.dom('button').hasAttribute('data-role', 'button');
    assert.dom('button').hasAttribute('type', 'button');
    assert.dom('button').hasClass('button-component-primary');
    assert.dom('button').hasText('Test');
  });

  test('secondary style', async function(assert) {
    await render(hbs`
      <Button 
        @style="secondary"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasClass('button-component-secondary');
  });

  test('with a specific role', async function(assert) {
    await render(hbs`
      <Button
        @role="test"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasAttribute('data-role', 'test');
  });

  test('disabled', async function(assert) {
    await render(hbs`
      <Button
        @disabled={{true}}
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').isDisabled();
  });

  test('primary style with icon', async function(assert) {
    await render(hbs`
      <Button 
        @icon="test"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasClass('button-component-primary');
    assert.dom('button').hasClass('with-icon');
    assert.dom('.__icon-box').exists();
    assert.dom('svg.__icon').exists();
  });

  test('secondary style with icon', async function(assert) {
    await render(hbs`
      <Button 
        @icon="test"
        @style="secondary"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasClass('button-component-secondary');
    assert.dom('button').hasClass('with-icon');
    assert.dom('.__icon-box').exists();
    assert.dom('svg.__icon').exists();
  });

  test('with classes', async function(assert) {
    await render(hbs`
      <Button
        @class="test"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasClass('test');
  });

  test('with type', async function(assert) {
    await render(hbs`
      <Button
        @type="submit"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasAttribute('type', 'submit');
  });

  test('small', async function(assert) {
    await render(hbs`
      <Button
        @size="small"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasClass('small');
  });

  test('large', async function(assert) {
    await render(hbs`
      <Button
        @size="large"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasClass('large');
  });

  test('link', async function(assert) {
    await render(hbs`
      <Button
        @style="link"
        @onClick={{action (mut onClick)}}
      >
        Test
      </Button>
    `);

    assert.dom('button').hasClass('button-component-link');
  });
});
