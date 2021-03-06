import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { test, testBS3, testBS4 } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-nav', 'Integration | Component | bs-nav', {
  integration: true
});

test('it has correct markup', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#bs-nav}}
      template block text
    {{/bs-nav}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text', 'Shows block content');
  assert.equal(findAll('ul').length, 1, 'it is an unordered list');
  assert.ok(find('ul').classList.contains('nav'), 'has nav class');
});

testBS3('it supports bootstrap options', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{bs-nav justified=true stacked=true type="pills"}}
  `);

  assert.ok(find('ul').classList.contains('nav-pills'), 'has pills class');
  assert.ok(find('ul').classList.contains('nav-justified'), 'has justified class');
  assert.ok(find('ul').classList.contains('nav-stacked'), 'has stacked class');
});

testBS4('it supports bootstrap options', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{bs-nav justified=true stacked=true type="pills"}}
  `);

  assert.ok(find('ul').classList.contains('nav-pills'), 'has pills class');
  assert.ok(find('ul').classList.contains('nav-justified'), 'has justified class');
  assert.ok(find('ul').classList.contains('flex-column'), 'has stacked class');
});

test('it exposes contextual components', function(assert) {
  this.render(hbs`
    {{#bs-nav as |nav|}}
      {{#nav.item}}
        {{#nav.link-to "application"}}Dummy{{/nav.link-to}}
      {{/nav.item}}
    {{/bs-nav}}
  `);

  assert.equal(findAll('.nav').length, 1, 'it has the nav');
  assert.equal(findAll('.nav li').length, 1, 'it has the nav item');
  assert.equal(findAll('.nav li a').length, 1, 'it has the nav link');
  // TODO: Add nav.dropdown
});
