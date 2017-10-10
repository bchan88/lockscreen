import Ember from 'ember';

const DEFAULT_HAS_DIGIT_SELECTED = [false, false, false, false, false, false, false, false, false];

export default Ember.Component.extend({
  classNames: ['text-center', 'center-block'],

  /* internal properties */
  inputPattern: null,
  savedPattern: null,
  hasDigitSelected: null,
  isPatternSaved: false,
  isTouching: false,

  isUnlocked: Ember.computed('isPatternSaved', 'inputPattern.@each', 'savedPattern.@each', function() {
    let inputPattern = this.get('inputPattern');
    let savedPattern = this.get('savedPattern');

    return this.get('isPatternSaved') &&
      inputPattern.length === savedPattern.length &&
      inputPattern.every((value, index) => value === savedPattern[index]);
  }),

  init() {
    this._super(...arguments);

    this.set('inputPattern', []);
    this.set('hasDigitSelected', DEFAULT_HAS_DIGIT_SELECTED.slice());
  },

  actions: {
    savePattern() {
      this.set('savedPattern', this.get('inputPattern'));
      this.set('inputPattern', []);
      this.set('isPatternSaved', true);
      this.set('hasDigitSelected', DEFAULT_HAS_DIGIT_SELECTED.slice());
    },

    resetPattern() {
      this.set('savedPattern', []);
      this.set('isPatternSaved', false);
      this.set('hasDigitSelected', DEFAULT_HAS_DIGIT_SELECTED.slice());
    },

    clearInput() {
      this.set('inputPattern', []);
      this.set('hasDigitSelected', DEFAULT_HAS_DIGIT_SELECTED.slice());
    },

    inputDigit(digit) {
      if (!this.get('hasDigitSelected').objectAt(digit)) {
        this.get('inputPattern').pushObject(digit);
        this.get('hasDigitSelected').replace(digit, 1, true);
      }
    },

    setTouching(isTouching) {
      this.set('isTouching', isTouching);
    }
  }
});
