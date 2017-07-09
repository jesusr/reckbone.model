import Model from 'reckbone.model';

function Reckbone(config = {}) {
  config.components = config.components ? config.components : comps;
  this.config = config;
  addComp.call(this, config.components);
  Reckbone.initialize(config);
}
Reckbone.initialize = function (config = {}) {
  // to be override
};
let comps = ['Model'];

function addComp(comps) {
  if (comps.indexOf('Model') > -1) this.Model = Model;
}

module.exports = Reckbone;