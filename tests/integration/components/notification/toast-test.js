import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | notification/toast', function(hooks) {
  setupRenderingTest(hooks);

  test('toast without dismiss', async function(assert) {
    let toast = {
      text: 'toast',
      countdown: true,
    };

    this.set('toast', toast);

    await render(hbs`<Notification::Toast @toast={{toast}} />`);

    assert.dom('[data-role=toast-text]').hasText('toast');
    assert.dom('.__dismiss-button').doesNotExist();
  });

  test('toast with dismiss', async function(assert) {
    let toast = {
      text: 'toast',
      countdown: false,
    };

    this.set('toast', toast);

    await render(hbs`<Notification::Toast @toast={{toast}} />`);

    assert.dom('[data-role=toast-text]').hasText('toast');
    assert.dom('.__dismiss-button').exists();
  });
});
