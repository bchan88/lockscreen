import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  attributeBindings: ['digit'],

  /* passed in properties */
  digit: -1,
  isTouching: false,
  hasDigitSelected: null,
  inputDigit() {},
  setTouching() {},
  clearInput() {},

  /* internal properties */
  hasSelected: Ember.computed('hasDigitSelected.@each', function() {
    return this.get('hasDigitSelected').objectAt(this.get('digit'));
  }),

  digitStyle: Ember.computed('hasSelected', function() {
    if (this.get('hasSelected')) {
      return Ember.String.htmlSafe('width: 80px; color:red;');
    }

    return Ember.String.htmlSafe('width: 80px;');
  }),

  touchStart() {
    this.get('setTouching')(true);
    this.get('clearInput')();
  },

  touchMove(event) {
    let touch = event.touches[0];
    let tag = document.elementFromPoint(touch.clientX, touch.clientY);
    let digit = this.$(tag).parent().parent().attr('digit');

    if (this.get('isTouching') && digit) {
      this.get('inputDigit')(digit);
    }
  },

  touchEnd() {
    this.get('setTouching')(false);
  },

  mouseDown() {
    this.get('setTouching')(true);
    this.get('clearInput')();
  },

  mouseUp() {
    this.get('setTouching')(false);
  },

  actions: {
    onInput() {
      if (this.get('isTouching')) {
        this.get('inputDigit')(this.get('digit'));
      }
    }
  }
});
