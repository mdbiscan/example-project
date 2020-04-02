import Service from '@ember/service';
import { assign } from '@ember/polyfills';
import fetch from 'fetch';
import config from 'ember-get-config';
import camelcaseKeysDeep from 'camelcase-keys-deep';
import decamelizeKeysDeep from 'decamelize-keys-deep';

const HEADER_BASE = Object.freeze({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
});

const { host } = config;

export default class ApiService extends Service {
  async get(url, headers = {}, options = { camelize: true }) {
    url = host + url;

    let response = await fetch(url, {
      method: 'get',
      headers: assign({}, HEADER_BASE, headers),
    });

    let responseData = await response.json();

    if (response.ok) {
      if (options.camelize) {
        responseData = camelcaseKeysDeep(responseData);
      }

      return responseData;
    } else {
      throw Error(
        responseData.errors ||
        responseData.error ||
        'An error occured fetching data.'
      );

    }
  }

  async post(url, data, headers = {}, options = { camelize: true }) {
    url = host + url;

    if (options.camelize) {
      data = decamelizeKeysDeep(data);
    }

    let response = await fetch(url, {
      method: 'post',
      headers: assign({}, HEADER_BASE, headers),
      body: JSON.stringify(data),
    });

    let responseData = await response.json();

    if (response.ok) {
      if (options.camelize) {
        responseData = camelcaseKeysDeep(responseData);
      }

      return responseData;
    } else {
      throw Error(
        responseData.errors ||
        responseData.error ||
        'An error occured posting data.'
      );
    }
  }

  async put(url, data, headers = {}, options = { camelize: true }) {
    url = host + url;

    if (options.camelize) {
      data = decamelizeKeysDeep(data);
    }

    let response = await fetch(url, {
      method: 'put',
      headers: assign({}, HEADER_BASE, headers),
      body: JSON.stringify(data),
    });

    let responseData = await response.json();

    if (response.ok) {
      if (options.camelize) {
        responseData = decamelizeKeysDeep(responseData);
      }

      return responseData;
    } else {
      throw Error(
        responseData.errors ||
        responseData.error ||
        'An error occured patching data.'
      );
    }
  }
}
