import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import Response from 'ember-cli-mirage/response';
import url from 'example/types/url';

module('Unit | Service | api', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('get success', async function(assert) {
    this.server.get(url.ONBOARD_USER, function(schema, request) {
      assert.deepEqual(request.requestHeaders, {
        "accept": "application/json",
        "content-type": "application/json",
        "foo": "bar",
      });

      return new Response(200, {}, {
        "foo": "bar",
      });
    });

    let service = this.owner.lookup('service:api');

    let response = await service.get(url.ONBOARD_USER, { foo: 'bar' });

    assert.deepEqual(response, { foo: 'bar' });
  });

  test('get error [errors]', async function(assert) {
    this.server.get(url.ONBOARD_USER, function() {
      return new Response(401, {}, {
        errors: 'test',
      });
    });

    let service = this.owner.lookup('service:api');

    try {
      await service.get(url.ONBOARD_USER, { foo: 'bar' });
    } catch (error) {
      assert.equal(error.message, 'test');
    }
  });

  test('get error [error]', async function(assert) {
    this.server.get(url.ONBOARD_USER, function() {
      return new Response(401, {}, {
        error: 'test',
      });
    });

    let service = this.owner.lookup('service:api');

    try {
      await service.get(url.ONBOARD_USER, { foo: 'bar' });
    } catch (error) {
      assert.equal(error.message, 'test');
    }
  });

  test('post success', async function(assert) {
    this.server.post(url.ONBOARD_USER_CREDENTIALS, function(schema, request) {
      let data = JSON.parse(request.requestBody);

      assert.deepEqual(request.requestHeaders, {
        "accept": "application/json",
        "content-type": "application/json",
        "foo": "bar",
      });

      assert.deepEqual(data, { baz: 'qux' });

      return new Response(200, {}, {
        "foo": "bar",
      });
    });

    let service = this.owner.lookup('service:api');

    let response = await service.post(url.ONBOARD_USER_CREDENTIALS, { baz: 'qux' }, { foo: 'bar' });

    assert.deepEqual(response, { foo: 'bar' });
  });

  test('post error [errors]', async function(assert) {
    this.server.post(url.ONBOARD_USER_CREDENTIALS, function() {
      return new Response(401, {}, {
        errors: 'test',
      });
    });

    let service = this.owner.lookup('service:api');

    try {
      await service.post(url.ONBOARD_USER_CREDENTIALS, { baz: 'qux' }, { foo: 'bar' });
    } catch (error) {
      assert.equal(error.message, 'test');
    }
  });

  test('post error [error]', async function(assert) {
    this.server.post(url.ONBOARD_USER_CREDENTIALS, function() {
      return new Response(401, {}, {
        error: 'test',
      });
    });

    let service = this.owner.lookup('service:api');

    try {
      await service.post(url.ONBOARD_USER_CREDENTIALS, { baz: 'qux' }, { foo: 'bar' });
    } catch (error) {
      assert.equal(error.message, 'test');
    }
  });

  test('camelize on get', async function(assert) {
    this.server.get(url.ONBOARD_USER, function() {
      return new Response(200, {}, {
        "foo_bar": "qux",
      });
    });

    let service = this.owner.lookup('service:api');

    let response = await service.get(url.ONBOARD_USER);

    assert.ok(response.fooBar);
  });

  test('not camelize on get', async function(assert) {
    this.server.get(url.ONBOARD_USER, function() {
      return new Response(200, {}, {
        "foo_bar": "qux",
      });
    });

    let service = this.owner.lookup('service:api');

    let response = await service.get(url.ONBOARD_USER, {}, { camelize: false });

    assert.ok(response.foo_bar);
  });

  test('camelize on post', async function(assert) {
    this.server.post(url.ONBOARD_USER_CREDENTIALS, function() {
      return new Response(200, {}, {
        "foo_bar": "qux",
      });
    });

    let service = this.owner.lookup('service:api');

    let response = await service.post(url.ONBOARD_USER_CREDENTIALS);

    assert.ok(response.fooBar);
  });

  test('not camelize on post', async function(assert) {
    this.server.post(url.ONBOARD_USER_CREDENTIALS, function() {
      return new Response(200, {}, {
        "foo_bar": "qux",
      });
    });

    let service = this.owner.lookup('service:api');

    let response = await service.post(url.ONBOARD_USER_CREDENTIALS, {}, {}, { camelize: false });

    assert.ok(response.foo_bar);
  });

  test('put success', async function(assert) {
    this.server.put(url.ONBOARD_USER_PASSWORD, function(schema, request) {
      let data = JSON.parse(request.requestBody);

      assert.deepEqual(request.requestHeaders, {
        "accept": "application/json",
        "content-type": "application/json",
        "foo": "bar",
      });

      assert.deepEqual(data, { baz: 'qux' });

      return new Response(200, {}, {
        "foo": "bar",
      });
    });

    let service = this.owner.lookup('service:api');

    let response = await service.put(url.ONBOARD_USER_PASSWORD, { baz: 'qux' }, { foo: 'bar' });

    assert.deepEqual(response, { foo: 'bar' });
  });

  test('put error [errors]', async function(assert) {
    this.server.put(url.ONBOARD_USER_PASSWORD, function() {
      return new Response(401, {}, {
        errors: 'test',
      });
    });

    let service = this.owner.lookup('service:api');

    try {
      await service.put(url.ONBOARD_USER_PASSWORD, { baz: 'qux' }, { foo: 'bar' });
    } catch (error) {
      assert.equal(error.message, 'test');
    }
  });

  test('put error [error]', async function(assert) {
    this.server.put(url.ONBOARD_USER_PASSWORD, function() {
      return new Response(401, {}, {
        error: 'test',
      });
    });

    let service = this.owner.lookup('service:api');

    try {
      await service.put(url.ONBOARD_USER_PASSWORD, { baz: 'qux' }, { foo: 'bar' });
    } catch (error) {
      assert.equal(error.message, 'test');
    }
  });

});
