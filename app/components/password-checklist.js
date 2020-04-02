import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PasswordChecklistComponent extends Component {
  @service passwordManager;

  get hasMinimumCharacters() {
    return this.passwordManager.hasMinimumCharacters;
  }
}
