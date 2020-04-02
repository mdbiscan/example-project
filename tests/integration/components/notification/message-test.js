import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | notification/message', function(hooks) {
  setupRenderingTest(hooks);

  test('success message', async function(assert) {

    let message = {
      text: 'success',
      type: 'success',
    };

    this.set('message', message);

    await render(hbs`
      <Notification::Message
        @message={{message}}
      />
    `);

    assert.dom('[data-role=message-text]').hasText('success');
    assert.dom('[data-ui-component=notification-message]').hasClass('success');
  });

  test('error message', async function(assert) {
    let message = {
      text: 'error',
      type: 'error',
    };

    this.set('message', message);

    await render(hbs`
      <Notification::Message
        @message={{message}}
      />
    `);

    assert.dom('[data-role=message-text]').hasText('error');
    assert.dom('[data-ui-component=notification-message]').hasClass('error');
  });

  test('info message', async function(assert) {
    let message = {
      text: 'info',
      type: 'info',
    };

    this.set('message', message);

    await render(hbs`
      <Notification::Message
        @message={{message}}
      />
    `);

    assert.dom('[data-role=message-text]').hasText('info');
    assert.dom('[data-ui-component=notification-message]').hasClass('info');
  });
});
