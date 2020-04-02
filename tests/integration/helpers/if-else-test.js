import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | if-else', function(hooks) {
  setupRenderingTest(hooks);

  test('condition true', async function(assert) {
    this.set('condition', true);
  
    await render(hbs`{{if-else condition "foo" "bar"}}`);

    assert.equal(this.element.textContent.trim(), 'foo');
  });

  test('condition false', async function(assert) {
    this.set('condition', false);
  
    await render(hbs`{{if-else condition "foo" "bar"}}`);

    assert.equal(this.element.textContent.trim(), 'bar');
  });
});
