import Reckbone from './reckbone';

class App {
  constructor(config = {}) {
    this.config = config;
  }
  initialize() {
    this.app = new Reckbone({
      components: ['Model']
    });
    this.app.modelData = new this.app.Model({data: 'perico'}, {
      debug: true
    });
  }
}

if (window) window.App = App;

export default App;
