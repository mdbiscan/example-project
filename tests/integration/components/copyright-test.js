import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('Integration | Component | copyright', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let year = moment().format('YYYY');

    await render(hbs`<Copyright @class="text-base-50a" />`);

    assert.dom('p').hasClass('text-md');
    assert.dom('p').hasClass('text-base-50a');
    assert.dom('p').hasText(`©${year}, Example Project, All Rights Reserved`)
  });
});
