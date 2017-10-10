import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  attributeBindings: ['digit'],

  /* passed in properties */
  digit: -1,
  inputDigit() {},

  /* internal properties */
  isInputted: false,
  isTouching: false,

  digitStyle: Ember.computed('isInputted', function() {
    if (this.get('isInputted')) {
      return Ember.String.htmlSafe('width: 80px; color:red;');
    }

    return Ember.String.htmlSafe('width: 80px;');
  }),

  touchStart() {
    this.set('isTouching', true);
  },

  touchMove(event) {
    let touch = event.touches[0];
    let tag = document.elementFromPoint(touch.clientX, touch.clientY);
    let digit = this.$(tag).parent().parent().attr('digit');

    if (!this.get('isInputted') && this.get('isTouching') && digit) {
      console.log('hover over ', digit);
    }
  },

  touchEnd() {
    this.set('isTouching', false);
  },

  mouseDown() {
    this.set('isTouching', true);
  },

  mouseUp() {
    this.set('isTouching', false);
  },

  actions: {
    onInput() {
      if (!this.get('isInputted') && this.get('isTouching')) {
        this.get('inputDigit')(this.get('digit'));
        this.set('isInputted', true);
      }
    }
  }
});
