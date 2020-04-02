import Service from '@ember/service';

export default class NotificationService extends Service {
  constructor() {
    super(...arguments);

    this.messages = [];
    this.toasts = [];

    this.delay = {
      auto: 5000,
      close: 250,
    };
  }

  addMessage(text, type, countdown) {
    let message = {
      text,
      type,
      countdown,
    };

    this.messages.pushObject(message);
  }

  removeMessage(message) {
    this.messages.removeObject(message);
  }

  addToast(text, countdown) {
    let toast = {
      text,
      countdown,
    };

    this.toasts.pushObject(toast);
  }

  removeToast(toast) {
    this.toasts.removeObject(toast);
  }

  clearAllMessages() {
    this.messages.clear();
  }

  clearErrors() {
    let errors = this.messages.filterBy('type', 'error');

    this.messages.removeObjects(errors);
  }

  error(error, options = { countdown: false }) {
    error = error.message || error;

    this.addMessage(error, 'error', options.countdown);
  }

  success(text, options = { countdown: true }) {
    this.addMessage(text, 'success', options.countdown);
  }

  info(text, options = { countdown: false }) {
    this.addMessage(text, 'info', options.countdown);
  }

  toast(text, options = { countdown: false }) {
    this.addToast(text, options.countdown);
  }
}
