import Component from '@ember/component';
import { computed } from '@ember/object';

const DEFAULT_GRID_STATE = [
  [
    { digit: 0, isInputted: false },
    { digit: 1, isInputted: false },
    { digit: 2, isInputted: false },
  ],
  [
    { digit: 3, isInputted: false },
    { digit: 4, isInputted: false },
    { digit: 5, isInputted: false },
  ],
  [
    { digit: 6, isInputted: false },
    { digit: 7, isInputted: false },
    { digit: 8, isInputted: false },
  ]
];

export default Component.extend({
  classNames: ['text-center', 'center-block'],

  /* internal properties */
  inputPattern: null,
  savedPattern: null,
  gridState: null,
  isPatternSaved: false,

  isUnlocked: computed('isPatternSaved', 'inputPattern.@each', 'savedPattern.@each', function() {
    let inputPattern = this.get('inputPattern');
    let savedPattern = this.get('savedPattern');

    return this.get('isPatternSaved') &&
      inputPattern.length === savedPattern.length &&
      inputPattern.every((value, index) => value === savedPattern[index]);
  }),

  init() {
    this._super(...arguments);

    this.set('inputPattern', []);
    this.set('gridState', DEFAULT_GRID_STATE);
  },

  actions: {
    savePattern() {
      console.log('save');
      this.set('savedPattern', this.get('inputPattern'));
      this.set('inputPattern', []);
      this.set('isPatternSaved', true);
      this.set('gridState', DEFAULT_GRID_STATE);
    },

    resetPattern() {
      this.set('savedPattern', []);
      this.set('isPatternSaved', false);
      this.set('gridState', DEFAULT_GRID_STATE);
    },

    resetInput() {
      this.set('inputPattern', []);
      this.set('gridState', DEFAULT_GRID_STATE);
    },

    inputDigit(digit) {
      this.get('inputPattern').pushObject(digit);
      let row = digit / 3;
      let column = digit % 3;

    }
  }
});
