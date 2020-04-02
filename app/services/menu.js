import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MenuService extends Service {
  @tracked show = false;

  close() {
    this.show = false;
  }

  open() {
    this.show = true;
  }

  toggle() {
    this.show = !this.show;
  }
}
