import { helper } from '@ember/component/helper';

export default helper(function ifNot([condition,value1,value2]) {
  if (condition) {
    return value1;
  } else {
    return value2;
  }
});
