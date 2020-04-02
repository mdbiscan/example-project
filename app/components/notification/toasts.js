import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NotificationToastsComponent extends Component {
  @service notification;

  @tracked toasts = this.notification.toasts;
}
