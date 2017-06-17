import Ember from 'ember';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import layout from 'ember-bootstrap/templates/components/bs-carousel';

const { computed } = Ember;

function useKeyboard(_this) {
  document.onkeyup = (event) => {
    // Left arrow
    if (event.keyCode === 37) {
      _this.prev();
    }
    // Right arrow
    if (event.keyCode === 39) {
      _this.next();
    }
  };
}

/**
 @class Carousel
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentParent
 @public
 */
export default Ember.Component.extend(ComponentParent, {
  layout,
  classNames: ['carousel', 'slide'],

  /**
   * @property currentIndex
   * @type number
   * @default 0
   * @private
   */
  currentIndex: 0,

  /**
   * An interval in miliseconds
   *
   * @property interval
   * @type number
   * @default 5000
   * @private
   */
  interval: 5000,

  /**
   * @property itemCount
   * @type number
   * @readonly
   * @private
   */
  itemCount: computed.readOnly('children.length'),

  /**
   * Whether the carousel should react to keyboard events.
   *
   * @property keyboard
   * @type boolean
   * @default true
   * @public
   */
  keyboard: true,

  next() {
    if (this.get('currentIndex') < this.get('itemCount') - 1) {
      this.incrementProperty('currentIndex');
    } else {
      this.set('currentIndex', 0);
    }
  },

  prev() {
    if (this.get('currentIndex') > 0) {
      this.decrementProperty('currentIndex');
    } else {
      this.set('currentIndex', this.get('itemCount') - 1);
    }
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('keyboard')) {
      useKeyboard(this);
    }

    setInterval(() => {
      this.next();
    }, this.interval);
  },

  actions: {
    prev() {
      this.prev();
    },
    next() {
      this.next();
    }
  }

});
