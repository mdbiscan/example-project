import Model, { attr, belongsTo } from '@ember-data/model';

export default class SettingModel extends Model {
  @attr('boolean') orderConfirmation;
  @attr('boolean') orderCancellationConfirmation;
  @attr('string') timezone;

  @belongsTo('user') user;
}
