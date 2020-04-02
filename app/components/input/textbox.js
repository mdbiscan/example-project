import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import Guid from 'ember-cli-guid';

const TIMEOUT = 500;

export default class InputTextBoxComponent extends Component {
  constructor() {
    super(...arguments);

    assert('<Input::Text> requires a name', this.args.name);
    assert('<Input::Text> requires a label', this.args.label);
  }

  @tracked focus = false;

  get placeholder() {
    return this.focus ? '' : this.args.label;
  }

  get full() {
    return this.args.full ? true : false;
  }

  get guid() {
    let guid = Guid.create();
    guid = Guid.compact(guid);

    return guid;
  }

  get type() {
    return this.args.type || 'text';
  }

  @action
  onFocusIn() {
    this.focus = true;

    if (this.args.onFocusIn) {
      this.args.onFocusIn();
    }
  }

  @action
  onFocusOut() {
    this.focus = false;

    if (this.args.onFocusOut) {
      this.args.onFocusOut();
    }
  }

  @action
  onKeyPress() {
    if (this.args.onKeyPress) {
      if (this._keypress) {
        clearTimeout(this._keypress);
      }

      this._keypress = setTimeout(this.args.onKeyPress, TIMEOUT);
    }
  }

  @action
  onKeyUp() {
    if (this.args.onKeyUp) {
      if (this._keyup) {
        clearTimeout(this._keyup);
      }

      this._keyup = setTimeout(this.args.onKeyUp, TIMEOUT);
    }
  }
}
