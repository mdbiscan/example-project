import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import Guid from 'ember-cli-guid';

export default class InputRadioComponent extends Component {
  constructor() {
    super(...arguments);

    assert('<RadioGroup> requires a name', this.args.name);
    assert('<Radio> requires a value', this.args.value);
  }

  get checked() {
    return this.args.groupValue === this.args.value;
  }

  get guid() {
    let guid = Guid.create();

    return Guid.compact(guid);
  }
}
