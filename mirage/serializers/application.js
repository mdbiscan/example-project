import { ActiveModelSerializer } from 'ember-cli-mirage';
import { underscore } from '@ember/string';

export default ActiveModelSerializer.extend({
  keyForAttribute(attr) {
    return underscore(attr);
  }
});
