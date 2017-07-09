let path = require('path');

module.exports = {
  entry: [path.join(__dirname, 'example/app.js')],
  output: {
    filename: './example/app.build.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: 'App'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js'],
    modules: [
      './src',
      'node_modules'
    ],
    alias: {
      modules: path.join(__dirname, 'node_modules'),
      // underscore: path.join(__dirname, 'src/helpers/overscore.js'),
      'reckbone.model': path.join(__dirname, 'src/reckbone.model.js')
    }
  },
  externals: {},
  plugins: [],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'source-map-loader',
      enforce: 'pre'
    }, {
      test: /\.js$/,
      exclude: /(node_modules)|(Gulpfile\.tmp)|(assets)/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      }
    }, {
      test: /\.hbs$/,
      exclude: /(node_modules)|(Gulpfile\.tmp)|(assets)/,
      loader: 'handlebars-template-loader'
    }, {
      test: /\.json$/,
      include: /(src\/data)/,
      exclude: /(node_modules)|(Gulpfile\.tmp)|(assets)/,
      loader: 'json-loader'
    }]
  },
  node: {
    fs: 'empty'
  }
};
