import Component from '@glimmer/component';
import moment from 'moment';

export default class CopyrightComponent extends Component {
  get year() {
    return moment().format('YYYY');
  }
}
