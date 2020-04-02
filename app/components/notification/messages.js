import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NotificationMessagesComponent extends Component {
  @service notification;

  @tracked messages = this.notification.messages;
}
