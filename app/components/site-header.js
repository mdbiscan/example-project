import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SiteHeaderComponent extends Component {
  @service menu;
  @service time;

  get ariaExpanded() {
    return this.menu.show ? 'true' : 'false';
  }

  @action
  onCloseMenu() {
    this.menu.close();
  }

  @action
  onToggleMenu() {
    this.menu.toggle();
  }
}
