import Controller from '@ember/controller';
import config from 'ember-get-config';

const DEV_ENVS = [
  'development',
  'integration',
];

export default class ApplicationController extends Controller {
  colorMode = 'default';

  get isDevelopment() {
    return DEV_ENVS.includes(config.environment);
  }
}
