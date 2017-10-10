import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['text-center', 'center-block'],

  /* internal properties */
  inputPattern: null,
  savedPattern: null,
  gridState: null,
  isPatternSaved: false,
  isLoading: true,

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
    this.set('isLoading', false);
  },

  actions: {
    savePattern() {
      this.set('isLoading', true);
      this.set('savedPattern', this.get('inputPattern'));
      this.set('inputPattern', []);
      this.set('isPatternSaved', true);

      Ember.run.later(() => this.set('isLoading', false), 500);
    },

    resetPattern() {
      this.set('isLoading', true);
      this.set('savedPattern', []);
      this.set('isPatternSaved', false);

      Ember.run.later(() => this.set('isLoading', false), 500);
    },

    resetInput() {
      this.set('isLoading', true);
      this.set('inputPattern', []);

      Ember.run.later(() => this.set('isLoading', false), 500);
    },

    inputDigit(digit) {
      this.get('inputPattern').pushObject(digit);
    }
  }
});
