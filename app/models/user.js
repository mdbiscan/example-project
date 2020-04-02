import Model, { attr, belongsTo } from '@ember-data/model';
import userRole from 'example/types/user-role';

export default class UserModel extends Model {
  @attr('string') email;
  @attr('string') type;

  @belongsTo('setting') setting;

  get isAdmin() {
    return this.type === userRole.ADMIN;
  }

  get isCleared() {
    return this.type === userRole.CLEARED;
  }

  get isViewOnly() {
    return this.type === userRole.VIEW_ONLY;
  }
}
