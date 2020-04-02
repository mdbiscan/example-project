import JWTAuthenticator from 'ember-simple-auth-token/authenticators/jwt';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { assign } from '@ember/polyfills';
import { isEmpty } from '@ember/utils';

export default JWTAuthenticator.extend({
  api: service(),

  async authenticate(credentials, headers) {
    let response = await this.makeRequest(this.serverTokenEndpoint, credentials, assign({}, this.headers, headers));

    return this.handleAuthResponse(response);
  },

  async makeRequest(url, data, headers) {
    return await this.api.post(url, data, headers, { camelize: false });
  },

  handleAuthResponse(response) {
    let token = get(response, this.tokenPropertyName);

    if (isEmpty(token) && isEmpty(response.errors)) {
      throw Error('Token is empty. Please check your backend response.');
    } if (response.errors) {
      throw Error(response.errors);
    }

    let tokenData = this.getTokenData(token);
    let expiresAt = get(tokenData, this.tokenExpireName);
    let tokenExpireData = {};

    tokenExpireData[this.tokenExpireName] = expiresAt;

    if (this.tokenExpirationInvalidateSession) {
      this.scheduleAccessTokenExpiration(expiresAt);
    }

    if (this.refreshAccessTokens) {
      let refreshToken = get(response, this.refreshTokenPropertyName);

      if (isEmpty(refreshToken)) {
        throw Error('Refresh token is empty. Please check your backend response.');
      }

      this.scheduleAccessTokenRefresh(expiresAt, refreshToken);
    }

    return assign(response, tokenExpireData, { tokenData });
  },
});
