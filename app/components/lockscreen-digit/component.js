import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  tagName: 'td',

  /* passed in properties */
  digit: -1,
  isInputted: false,
  inputDigit() {},

  /* internal properties */
  digitStyle: computed('isInputted', function() {
    if (this.get('isInputted')) {
      return htmlSafe('width: 80px; color:red;');
    }

    return htmlSafe('width: 80px;');
  }),

  actions: {
    onInput() {
      if (!this.get('isInputted')) {
        this.get('inputDigit')(this.get('digit'));
        // this.set('isInputted', true);
      }
    }
  }
});
