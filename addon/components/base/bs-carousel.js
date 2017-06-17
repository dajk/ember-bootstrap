import Ember from 'ember';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import layout from 'ember-bootstrap/templates/components/bs-carousel';

const { computed } = Ember;

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
   * @property itemCount
   * @type number
   * @readonly
   * @private
   */
  itemCount: computed.readOnly('children.length'),

  /**
   * @property delay
   * @type number
   * @default 4000
   * @private
   */
  delay: 4000,

  /**
   * @property hasNext
   * @type boolean
   * @readonly
   * @private
   */
  hasNext: computed('currentIndex', 'itemCount', function() {
    return this.get('currentIndex') < this.get('itemCount') - 1;
  }).readOnly(),

  /**
   * @property hasPrev
   * @type boolean
   * @readonly
   * @private
   */
  hasPrev: computed.gt('currentIndex', 0).readOnly(),

  next() {
    if (this.get('hasNext')) {
      this.incrementProperty('currentIndex');
    } else {
      this.set('currentIndex', 0);
    }
  },

  prev() {
    if (this.get('hasPrev')) {
      this.decrementProperty('currentIndex');
    } else {
      this.set('currentIndex', this.get('itemCount') - 1);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    setInterval(() => {
      this.next();
    }, this.delay);
  }

});
