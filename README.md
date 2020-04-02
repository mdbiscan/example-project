# Frontend

## Mock Login Credentials

* `email` admin@example.com
* `password` Password123!

## Ember
This outlines the details of the Example frontend Ember application.

_Note that this is opted into the Ember Octane preview. Octane is scheduled to be
the default in Ember before this application would be released into production. When
viewing Ember documentation, please look for Octane notes._

## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `npm install`

### Commands

**Development**
* `ember serve` will run the dev environment
* Visit your app at [http://localhost:4200](http://localhost:4200)
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests)

**Builds**
* `ember build` will build for development (the build is watched when using `ember s` or `npm run integration`.
* `ember build --environment production` will build for production

**Testing**
* `ember test`  will run the tests in the terminal only
* `ember test --server` will run the tests in the terminal and the browser in a separate instance

**Generators and Blueprints**
Make use of the many generators for code, try `ember help generate` for more details. Generators will provide necessary javascript, handlebar, and test files.

## SVGs and Images

This project uses the [SVG Jar](https://github.com/ivanvotti/ember-svg-jar) addon. See [http://localhost:4200/ember-svg-jar/index.html](http://localhost:4200/ember-svg-jar/index.html)
for avaivable SVGs for design requirements.

SVGs used for icons should be saved in the `public/icons` folder and will be auto-loaded into SVG Jar during the build. 

All other image filetypes and SVGs not used as icons should be saved in `public/images`.

## Tailwind CSS

This project uses [TailwindCSS](https://tailwindcss.com/) with a custom configuration. Please refer to both the Tailwind API and the app-level Tailwind Config file (colors, margins, padding) located at `app/tailwind/config.js`.

## Further Reading

### Ember APIs
  * [Ember API](https://api.emberjs.com/ember/release)
  * [Ember Data API](https://api.emberjs.com/ember-data/release)
  * [Ember CLI](https://ember-cli.com/)

### Testing APIs
  * [Ember Test Helpers](https://github.com/emberjs/ember-test-helpers/blob/master/API.md)
  * [QUnit API](https://qunitjs.com/)
  * [Qunit DOM Helpers](https://github.com/simplabs/qunit-dom) (Ember Addon)

### Addons
  * [Ember Moment](https://github.com/stefanpenner/ember-moment) (Moment template helpers)
  * [Moment API](https://momentjs.com/)
  * [Ember Truth Helpers](https://github.com/jmurphyau/ember-truth-helpers) (Additional template condition lgoic)
  * [TailwindCSS](https://tailwindcss.com/)
  * [SVG Jar](https://github.com/ivanvotti/ember-svg-jar)
  * [Lodash](https://lodash.com/)
  * [Ember Freestyle](https://github.com/chrislopresto/ember-freestyle) 
  * [Ember Class Modifier](https://github.com/lifeart/ember-class-modifier)

### Ember Inspector
  * [Chrome Plugin](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [FireFox Plugin](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
