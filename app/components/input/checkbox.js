import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import Guid from 'ember-cli-guid';

export default class InputCheckboxComponent extends Component {
  constructor() {
    super(...arguments);

    assert('<Input::Checkbox> requires a name', this.args.name);
  }

  get guid() {
    let guid = Guid.create();
    guid = Guid.compact(guid);

    return guid;
  }

  @action
  onClick(event) {
    if (this.args.onClick && !this.args.disabled) {
      this.args.onClick(event);
    }
  }
}
