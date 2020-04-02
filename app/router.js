import EmberRouter from '@ember/routing/router';
import config from 'ember-get-config';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('freestyle');
  this.route('login');
  this.route('password-reset');
  this.route('password-update');

  this.route('authenticated', { path: '' }, function() {
    this.route('settings');
  });

  this.route('onboard', function() {
    this.route('add-credentials');
    this.route('complete');
    this.route('create-password');
    this.route('start');
  });
});

export default Router;
