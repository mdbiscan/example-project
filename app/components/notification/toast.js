import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NotificationToastComponent extends Component {
  constructor() {
    super(...arguments);

    if (this.args.toast.countdown) {
      this.timer = this.autoPop();
    }
  }

  @service notification;

  @tracked isClosing = false;

  pop() {
    if (!this.isClosing) {
      this.isClosing = true;

      setTimeout(() => this.notification.removeToast(this.args.toast), this.notification.delay.close);
    }
  }

  autoPop() {
    return setTimeout(() => this.pop(), this.notification.delay.auto);
  }

  @action
  onPop() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.pop();
  }
}
