import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import config from 'ember-get-config';

const DEV_ENVS = [
  'development',
  'integration',
];

export default class ApplicationController extends Controller {
  @tracked colorMode = 'light';

  get isDevelopment() {
    return DEV_ENVS.includes(config.environment);
  }
}
