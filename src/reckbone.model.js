/* jshint -W089*/
import _ from 'overscore';

export default class Model {
  constructor(attributes = {}, options = {}, Reckbone = {}) {
    let attrs = attributes,
      defaults;
    _.extend(this, Reckbone.Events, {
      validationError: null,
      idAttribute: 'id',
      cidPrefix: 'c',
      attributes: {},
      changed: {},
      cid: 'c-' + new Date().getTime()
    });
    this.preinitialize.apply(this, arguments);
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    else attrs = attributes;
    defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.initialize.apply(this, arguments);
  }
  preinitialize() {
    // to be overwritten in derivated classes
  }
  initialize() {
    // to be overwritten in derivated classes
  }
  get(attr) {
    return attr ? this.attributes[attr] : Object.assign({}, this.attributes);
  }
  set(key, val, options) {
    if (!key) return this;
    let preset = _preSet.call(this, key, val),
      changes = [],
      changing = this._changing,
      current;
    if (!preset) return false;
    this._changing = true;
    if (!changing && _.isUndefined(changing)) _.extend(this, {
      _previousAttributes: Object.assign({}, this.attributes || {}),
      changed: {}
    });
    current = this.attributes;
    for (let attr in preset.attrs) {
      if (preset.attrs[attr]) {
        val = preset.attrs[attr];
        if (this.attributes[attr] !== val) changes.push(attr);
        this._previousAttributes[attr] !== val ? this.changed[attr] = val : delete this.changed[attr];
        preset.options.unset ? delete this.attributes[attr] : this.attributes[attr] = val;
      }
    }
    if (this.idAttribute in preset.attrs) this.id = this.get(this.idAttribute);
    if (!preset.options.silent) {
      if (changes.length) this._pending = options;
      for (let i = 0; i < changes.length; i++)
        if (this.trigger) this.trigger('change:' + changes[i], this, current[changes[i]], options);
    }
    if (changing) return this;
    if (!preset.options.silent)
      while (this._pending) {
        options = this._pending;
        this._pending = false;
        if (this.trigger) this.trigger('change', this, options);
      }
    this._pending = false;
    this._changing = false;
    return this;
  }
  unset(attr, options) {
    return this.set(attr, void 0, _.extend({}, options, {
      unset: true
    }));
  }
  clear(options) {
    let attrs = {};
    for (let key in this.attributes) attrs[key] = void 0;
    return this.set(attrs, _.extend({}, options, {
      unset: true
    }));
  }
  previous(attr = null) {
    return (attr && this._previousAttributes) ? this._previousAttributes[attr] :
      (this._previousAttributes) ? this._previousAttributes : null;
  }
  destroy(options) {
    options = options ? Object.assign({}, options) : {};
    let model = this,
      xhr = false,
      destroy = function () {
        model.stopListening();
        model.trigger('destroy:model', model, model.collection, options);
      };
    options.success = function (resp) {
      if (options.wait) destroy();
      if (options.success) options.success.call(options.context, model, resp, options);
    };
    if (_isNew.call(this)) {
      _.defer(options.success);
    }
    if (!options.wait) destroy();
    return xhr;
  }
  parse(resp) {
    // to be overwritten in derivated classes
    return resp;
  }
  clone() {
    return new this.constructor(this.attributes);
  }
}

function _preSet(key, val) {
  let options, attrs;
  (typeof key === 'object') ? (attrs = key) && (options = val) : (attrs = {})[key] = val;
  options || (options = {});
  return _validate.call(this, attrs, options) ? {
    attrs: attrs,
    options: options
  } : false;
}

function _validate(attrs, options) {
  let error;
  if (!options.validate || !this.validate) return true;
  attrs = _.extend({}, this.attributes, attrs);
  if (!(error = this.validationError = this.validate(attrs, options) || null)) return true;
  if (this.trigger) this.trigger('invalid', this, error, _.extend(options, {
    validationError: error
  }));
  return false;
}

function _isNew() {
  return !this.has(this.idAttribute);
}
