import { Ability } from 'ember-can';
import { inject as service  } from '@ember/service';

export default class OnboardAbility extends Ability {
  @service onboarding;

  get canViewTradingCredentialsDuring() {
    return this.onboarding.isClearedUser;
  }
}
