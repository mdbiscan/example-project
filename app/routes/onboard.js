import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import onboardingStatus from 'example/types/onboarding-status';

export default class OnboardRoute extends Route {
  @service onboarding;
  @service notification;

  async model() {
    await this.onboarding.loadToken();

    if (this.onboarding.token) {
      try {
        await this.onboarding.load();
      } catch (error) {
        this.notification.error(error)
      }
    } else {
      this.notification.info('We could not find your onboarding token.');
    }
  }

  redirect() {
    if (this.onboarding.status) {
      switch (this.onboarding.status) {
        case onboardingStatus.PASSWORD:
          this.transitionTo('onboard.start');
          break;
        case onboardingStatus.CREDENTIALS:
          this.transitionTo('onboard.add-credentials');
          break;
        default:
          this.transitionTo('login');
      }
    } else {
      this.transitionTo('login');
    }
  }
}
