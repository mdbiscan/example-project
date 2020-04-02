'use strict';

// TODO: whitelist urls for credentials

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'example',
    environment,
    rootURL: '/',
    locationType: 'auto',
    host: '',
    moment: {
      // Options:
      // 'all' - all years, all timezones
      // '2010-2020' - 2010-2020, all timezones
      // 'none' - no data, just timezone API
      includeTimezone: 'all'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };

    // TODO: ENV.host;
  }

  // TODO: Configurations
  ENV.contentSecurityPolicy = {
    'default-src': ["'self'"],
    'connect-src': ["'self'", "http://localhost:3000"],
  };

  ENV['ember-simple-auth-token'] = {
    authorizationHeaderName: 'Authorization', // Header name added to each API request
    authorizationPrefix: '', // Prefix added to each API request
    serverTokenEndpoint: `/users/sign_in`,
    tokenPropertyName: 'auth_token',
    // If we end up needing expiration or refresh,
    // reflect this in the token being returned
    // from mirage
    tokenExpirationInvalidateSession: false,
    refreshAccessTokens: false,
  };

  return ENV;
};
