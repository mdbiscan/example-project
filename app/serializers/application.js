import { ActiveModelSerializer } from 'active-model-adapter';
import { underscore } from '@ember/string';

export default class ApplicationSerializer extends ActiveModelSerializer {
  keyForAttribute(key) {
    return underscore(key);
  }
}
