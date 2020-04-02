import Response from 'ember-cli-mirage/response';
import config from 'ember-get-config';
import url from 'example/types/url';
import onboardingStatus from 'example/types/onboarding-status';
import onboardingData from '../mirage/fixtures/onboarding-data';

const encodedToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImp0aSI6IjIwMTktMTItMjBUMTE6MzU6NDUuMjg4NjAwNTg0IiwidDdVc2VyIjoiYWRtaW5fdDciLCJ0N1VzZXJQYXNzd29yZCI6IlNlY3JldDEyMyEiLCJ0N0J1c2luZXNzVW5pdCI6bnVsbH0.QczcFEEMq8n_gTA7gFBje6WQVYcy3YE2j1zlb3VZse4';

export default function() {
  this.namespace = config.namespace;
  /*
   * All endpoints after this.namespace will be intercepted
   */

  this.get('users/:id');

  this.post(url.USER_PASSWORD, (schema, request) => {
    let params = JSON.parse(request.requestBody);
    let response;

    let {
      email,
    } = params.user;

    if (email === 'admin@example.com') {
      response = new Response(200, {}, {});
    } else {
      response = new Response(401, {}, {
        errors: 'The email you provided does not match an active account in our system.',
      });
    }

    return response;
  });

  this.post(url.ONBOARD_USER_PASSWORD, (schema, request) => {
    let params = JSON.parse(request.requestBody);
    let response;
    let {
      password,
      confirm_password
    } = params;

    if (password === confirm_password) {
      response = new Response(200, {}, {});
    } else {
        response = new Response(401, {}, {
        errors: ['Validation failed: Password confirmation doesn\'t match Password.'],
      });}

    return response;
  });

  this.post(url.ONBOARD_USER_CREDENTIALS, (schema, request) => {
    let params = JSON.parse(request.requestBody);
    let response;
    let {
      first_name,
      last_name,
      work_phone
    } = params;
    if (first_name && last_name && work_phone) {
      response = new Response(200, {}, {});
    } else {
        response = new Response(400, {}, {
        errors: ['Validation failed: Fields are missing.'],
      });}

    return response;
  });


  this.put(url.USER_PASSWORD, (schema, request) => {
    let params = JSON.parse(request.requestBody);
    let response;

    let {
      reset_password_token,
    } = params.user;

    if (reset_password_token) {
      let data = onboardingData;

      return JSON.stringify(data);
    } else {
      response = new Response(422, {}, {
        "errors":["Password reset token is invalid"]
      });
    }

    return response;
  });

  this.post(url.USER_SIGNIN, (schema, request) => {
    let params = JSON.parse(request.requestBody);
    let response;

    let {
      email,
      password,
    } = params.user;

    if (email === 'admin@example.com' && password === 'Password123!') {
      response = new Response(200, {}, {
        "auth_token": encodedToken,
        "token_type": "Bearer"
      });
    } else {
      response = new Response(401, {}, {
        errors: 'Email or password is invalid.',
      });
    }

    return response;
  });

  this.get(url.ONBOARD_USER, (schema, request) => {
    let token = request.requestHeaders.authentication;

    if (token) {
      let data = onboardingData;

      return JSON.stringify(data);
    } else {
      return {
        "errors": ["Token not provided"]
      };
    }
  });

  this.post(url.ONBOARD_USER, (schema, request) => {
    let token = request.requestHeaders.authentication;

    if (token) {
      let data = JSON.parse(request.requestBody);

      data = Object.assign(data, onboardingData);

      if (data.onboardingStatus === onboardingStatus.PASSWORD) {
        data.onboarding_status = onboardingStatus.CREDENTIALS;
      } else if (data.onboardingStatus === onboardingStatus.CREDENTIALS) {
        data.onboarding_status = onboardingStatus.DONE;
      }

      return JSON.stringify(data);
    } else {
      return {
        "errors": ["Token not provided"]
      }
    }
  });

  this.get('/settings/:id');

  this.put('/settings/:id');
}
