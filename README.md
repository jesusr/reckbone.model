
# reckbone.model

Model for data manipulation with bindings, triggers and events.

## Getting Started

`import  Model  from  'reckbone.model';`

You can register the Model module as part of a Reckbone framework like:

````
import  Model  from  'reckbone.model';
function  Reckbone(config = {}) {
	config.components = config.components ? config.components : comps;
	this.config = config;
	addComp.call(this, config.components);
	Reckbone.initialize(config);
}
Reckbone.initialize = function (config = {}) {
	// to be override
};
let  comps = ['Model'];
function  addComp(comps) {
	if (comps.indexOf('Model') > -1) this.Model = Model;
}
module.exports = Reckbone;
````

## Running the tests

We use **Karma**,  **Mocha** and **Chai** as default test runner in this project. Run `npm test`, or use the debug system at **VSCode**. It will generate the code coverage for you at `/coverage` folder. The configuration for the coverage task is under the `karma.conf.js` file at the project root.

### Code quality, linters and styling
 
Controlled by **Eslint**.


## Development

```bash
npm run build
```  

## Built With

*  [Webpack](https://webpack.js.org/) - Compiler

## Versioning

We use a kind of [SemVer](http://semver.org/) for versioning.

The major corresponds for the version of the product, the minor gives your the sprint number of that version, the patch is the number of the corrections given to the client over that dist version. Imagine that you are in the first phase of a product, second sprint and three delivered versions:

  

- if you are in the first phase, the number will be 0, because in a first phase there aren't any final product version.

- if you are in the second sprint, the number will be 2.

- if you delivered three versions, the number will be 3.
- 
So the tag of that version will 0.2.3.