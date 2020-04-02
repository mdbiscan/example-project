import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';
import Guid from 'ember-cli-guid';

export default class ToggleComponent extends Component {
  constructor() {
    super(...arguments);

    assert('<Toggle> requires a label', this.args.label);
  }

  get guid() {
    let guid = Guid.create();
    guid = Guid.compact(guid);

    return guid;
  }

  get name() {
    return dasherize(this.args.label);
  }
}
