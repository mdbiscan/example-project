import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OnboardAddCredentialsRoute extends Route {
  @service onboarding;

  setupController(controller) {
    let {
      firstName,
      lastName,
      workPhone,
    } = this.onboarding.data;

    controller.firstName = firstName;
    controller.lastName = lastName;
    controller.workPhone = workPhone;
  }
}
