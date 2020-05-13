import { inject as service } from '@ember/service';
import { inject as controller  } from '@ember/controller'
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import FreestyleController from 'ember-freestyle/controllers/freestyle';

export default class FreestyleOctaneController extends FreestyleController {
  @service emberFreestyle;
  @service notification;
  @controller application;

  onTransition(event) {
    let element = event.target;

    if (element.classList.contains('text-gray-900')) {
      element.classList.remove('text-gray-900');
      element.classList.remove('p-4');
      element.classList.add('text-green-500');
      element.classList.add('p-24');
    } else {
      element.classList.remove('text-green-500');
      element.classList.remove('p-24');
      element.classList.add('text-gray-900');
      element.classList.add('p-4');
    }
  }

  @tracked checkboxAltValue = false;
  @tracked checkboxValue = false;
  @tracked dropdownValue = null;
  @tracked radioValue = null;
  @tracked toggleCheck = false;

  get dropdownOptions() {
    return [
      {
        value: '1',
        label: 'Option 1',
      },
      {
        value: '2',
        label: 'Option 2',
      },
      {
        value: '3',
        label: 'Option 3',
      },
      {
        value: '4',
        label: 'Option 4',
      },
    ];
  }

  @action
  onClick() {
    alert('Hello');
  }

  @action
  onNotifyError() {
    this.notification.error('Error!');
  }

  @action
  onNotifyInfo() {
    this.notification.info('Info!');
  }

  @action
  onNotifySuccess() {
    this.notification.success('Success!');
  }

  @action
  onClearAllNotificationMessages() {
    this.notification.clearAllMessages();
  }

  @action
  onToastAutoPop() {
    this.notification.toast('This will close itself.', { countdown: true });
  }

  @action
  onToastManualPop() {
    this.notification.toast('This you will have to close.');
  }

  @action
  onCheckBoxClick(event) {
    alert(`Check! ${event.target.checked}`);

    this.checkboxAltValue = !this.checkboxAltValue;
  }
}
