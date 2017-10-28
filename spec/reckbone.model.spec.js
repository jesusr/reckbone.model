var chai = require('chai'),
  should, expect;
import Reckbone from '../example/reckbone';
import Model from '../src/reckbone.model';
import $ from 'jquery';
import _ from 'overscore';

describe('Reckbone.Model initialize', () => {
  should = chai.should();
  expect = chai.expect;
  describe('Constructor and initialize', () => {
    describe('with default values', () => {
      it('Model class is attached', () => {
        let app = new Reckbone({
          components: ['Model']
        });
        app.Model.should.be.deep.equal(Model);
      });
      it('Model constructor', () => {
        let model = new Model();
        model.idAttribute.should.be.equal('id');
        model.attributes.should.be.deep.equal({});
        model.cid.indexOf('c-').should.be.equal(0);
      });
    });
    describe('with values', () => {
      it('View constructor with template', () => {
        let attrs = {
          template: '<div id="body">{{variable}}</div>',
          container: $('#main'),
          exTemplateConfig: {
            variable: 'Prueba de concepto'
          },
          events: {
            'click .t': 'show'
          }
        };
        let model = new Model(attrs);
        model.attributes.should.be.deep.equal(attrs);
      });
    });
  });
  describe('Methods', () => {
    describe('Set', () => {
      it('Regular behaviour', () => {
        let attrs = {
          template: '<div id="body">{{variable}}</div>',
          isChild: true,
          exTemplateConfig: {
            variable: 'Prueba de concepto'
          },
          events: {
            'click .t': 'show'
          }
        };
        let model = new Model();
        model.set(attrs);
        model.attributes.should.be.deep.equal(attrs);
      });
    });
    describe('UnSet', () => {
      it('Regular behaviour', () => {
        let attrs = {
          template: '<div id="body">{{variable}}</div>',
          isChild: true,
          exTemplateConfig: {
            variable: 'Prueba de concepto'
          },
          events: {
            'click .t': 'show'
          }
        };
        let model = new Model();
        model.set(attrs);
        model.unset('exTemplateConfig');
        console.log(model.attributes);
        delete attrs.exTemplateConfig;
        console.log(attrs);
        model.attributes.should.be.deep.equal(attrs);
      });
    });
    //       });
    //       describe('Hide', () => {
    //         it('Regular behaviour', () => {
    //           let opt = {
    //             template: '<div id="body">{{variable}}</div>',
    //             isChild: true,
    //             exTemplateConfig: {
    //               variable: 'Prueba de concepto'
    //             },
    //             events: {
    //               'click .t': 'show'
    //             }
    //           };
    //           let view = new View(opt);
    //           view.hide();
    //           view.$el.css('display').should.be.equal('none');
    //         });
    //       });
    // 			describe('CleanEvents', () => {
    //         it('Regular behaviour', () => {
    //           let opt = {
    //             template: '<div id="body">{{variable}}</div>',
    //             isChild: true,
    //             exTemplateConfig: {
    //               variable: 'Prueba de concepto'
    //             },
    //             events: {
    //               'click .t': 'show'
    //             }
    //           };
    //           let view = new View(opt);
    //           view.cleanEvents();
    //           view.eventsRef.should.be.deep.equal([]);
    //         });
    //       });
    // 			describe('Remove', () => {
    //         it('Regular behaviour', () => {
    //           let opt = {
    //             template: '<div id="body">{{variable}}</div>',
    //             isChild: true,
    //             exTemplateConfig: {
    //               variable: 'Prueba de concepto'
    //             },
    //             events: {
    //               'click .t': 'show'
    //             }
    //           };
    //           let view = new View(opt);
    //           view.remove();
    //           expect(view.el).to.be.equal(null);
    //         });
    //       });
    //     });
    //   });
    //   describe('Class extend', () => {
    //     describe('with template', () => {
    //       it('and constructor', () => {
    //         let SubView = View.extend({
    //           constructor: function (conf) {
    //             // to force the constructor case
    //             View.prototype.constructor.call(this, conf);
    //           },
    //           template: '<div id="header"><h1>View example</h1></div>',
    //           isChild: true
    //         });
    //         let subView = new SubView();
    //         subView.el.should.not.be.undefined;
    //         subView.$el.should.not.be.undefined;
    //       });
    //       it('and without constructor', () => {
    //         let SubView = View.extend({
    //           template: '<div id="header"><h1>View example</h1></div>',
    //           isChild: true
    //         });
    //         let subView = new SubView();
    //         subView.el.should.not.be.undefined;
    //         subView.$el.should.not.be.undefined;
    //       });
    //     });
  });
});
