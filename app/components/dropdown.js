import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { lowerCase, replace } from 'lodash';
import Guid from 'ember-cli-guid';

export default class DropdownComponent extends Component {
  constructor() {
    super(...arguments);

    assert('<Dropdown> requires a label', this.args.label);
  }

  @tracked disabled;

  get guid() {
    let guid = Guid.create();

    return Guid.compact(guid);
  }

  get role() {
    let label = lowerCase(this.args.label);
    label = replace(label, / /g, '-')

    return `${label}-dropdown`;
  }

  get default() {
    return this.args.default || 'Choose Option';
  }

  get selectedValue() {
    return this.args.options.find(option => option.value === this.args.value);
  }

  onSelect(value, api) {
    api.select(value);
    api.close();
  }

  onPressDown(event, api) {
    api.activateNextOption();
  }

  onPressUp(event, api) {
    api.activatePreviousOption();
  }

  onClose(element, api) {
    api.close();
  }

  onOpen(element, api) {
    api.open();
  }
}
