import Component from '@glimmer/component';
import { action } from '@ember/object';

const style = Object.freeze({
  LINK: 'link',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
});

const size = Object.freeze({
  LARGE: 'large',
  SMALL: 'small',
});

export default class ButtonComponent extends Component {
  get bubbles() {
    return this.args.bubbles ? true : false;
  }

  get isLarge() {
    return this.args.size === size.LARGE;
  }

  get isSmall() {
    return this.args.size === size.SMALL;
  }

  get isPrimaryIcon() {
    return this.args.icon && this.style === style.PRIMARY;
  }

  get isSecondaryIcon() {
    return this.args.icon && this.style === style.SECONDARY;
  }

  get role() {
    return this.args.role || 'button';
  }

  get style() {
    return this.args.style || 'primary';
  }

  get type() {
    return this.args.type || 'button';
  }

  @action
  onClick(event) {
    if (!this.bubbles) {
      event.stopPropagation();
    }

    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}
