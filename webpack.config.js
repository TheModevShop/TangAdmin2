var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var filenameResolver = require('./filenameResolver');

var appName = 'app';
var host = '0.0.0.0';
var port = '9000';

var plugins = [
      new filenameResolver()
    ], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new webpack.NoErrorsPlugin())
  plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: false}))
}

var config = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    publicPath: __dirname + '/example'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loaders: ["babel?stage=1&optional=runtime"],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.less$/, 
        loaders: ['style', 'css', 'autoprefixer?browsers=last 2 versions', 'less', 'less-autoimports']
      },
      {
        test: /\.css$/, 
        loaders: ['style', 'css', 'autoprefixer?browsers=last 2 versions']
      },
      {
        test: /\.woff$/, 
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff'},
      {
        test: /\.ttf$/, 
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.eot$/, 
        loader: 'file-loader?name=fonts/[name].[ext]'
      },       
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: "file-loader?name=img/[name].[ext]"
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['web_modules', 'node_modules', 'local_modules']
  },
  resolveLoader: {
    modulesDirectories: ['loaders', 'web_loaders', 'web_modules', 'node_loaders', 'node_modules', '`local_modules`']
  },
  plugins: plugins
};

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: './example',
    hot: true,
    debug: true
  }).listen(port, host, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  console.log('-------------------------');
  console.log('Local web server runs at http://' + host + ':' + port);
  console.log('-------------------------');
}

module.exports = config;