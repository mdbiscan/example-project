import ActiveModelAdapter from 'active-model-adapter';
import { underscore } from '@ember/string';
import { computed, get } from '@ember/object';
import { pluralize } from 'ember-inflector';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';
import config from 'ember-get-config';

const {
  host,
  namespace,
} = config;

export default class ApplicationAdapter extends ActiveModelAdapter.extend(TokenAuthorizerMixin) {
  host = host;
  namespace = namespace;

  authorizer = 'authorizer:jwt';

  pathForType(modelName) {
    let underscored = underscore(modelName);
    return pluralize(underscored);
  }

  // Add tokens to the header
  @computed('session.auth_token')
  get headers() {
    let data = get(this, 'session.data.authenticated');
    let token = get(data, this.tokenPropertyName);

    return {
      [this.authorizationHeaderName]: token,
    };
  }
}
