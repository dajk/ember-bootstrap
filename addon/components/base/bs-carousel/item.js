import Ember from 'ember';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import layout from 'ember-bootstrap/templates/components/bs-carousel/item';

const { computed } = Ember;

/**
 @class CarouselItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.ComponentChild
 @public
 */
export default Ember.Component.extend(ComponentChild, {
  layout,
  classNameBindings: ['active'],

  /**
   * @property active
   * @type boolean
   * @readonly
   * @private
   */
  active: computed('currentIndex', 'ownIndex', function() {
    return this.get('currentIndex') === this.get('ownIndex');
  }).readOnly(),

  /**
   * @property currentIndex
   * @type number
   * @public
   */
  currentIndex: null,

  /**
   * Array of all the parent's slides
   *
   * @property siblings
   * @type array
   * @readonly
   * @private
   */
  siblings: computed.readOnly('_parent.children'),

  /**
   * The index number of this slide within all slides
   *
   * @property ownIndex
   * @type number
   * @readonly
   * @private
   */
  ownIndex: computed('siblings.[]', function() {
    return this.get('siblings').indexOf(this);
  }).readOnly()

});
