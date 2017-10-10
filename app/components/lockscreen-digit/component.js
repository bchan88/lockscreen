import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',

  /* passed in properties */
  digit: -1,
  inputDigit() {},

  /* internal properties */
  isInputted: false,

  digitStyle: Ember.computed('isInputted', function() {
    if (this.get('isInputted')) {
      return Ember.String.htmlSafe('width: 80px; color:red;');
    }

    return Ember.String.htmlSafe('width: 80px;');
  }),

  actions: {
    onInput() {
      if (!this.get('isInputted')) {
        this.get('inputDigit')(this.get('digit'));
        this.set('isInputted', true);
      }
    }
  }
});
