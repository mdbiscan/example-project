import { Factory } from 'ember-cli-mirage';
export default Factory.extend({
  afterCreate(user, server) {
    server.create('setting', {
      user,
      order_confirmation: true,
      order_cancellation_confirmation: false,
      timezone: 'America/Chicago',
    });
  }
});
