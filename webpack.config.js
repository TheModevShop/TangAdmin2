var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var filenameResolver = require('./filenameResolver');


var plugins = [new filenameResolver(),
new webpack.HotModuleReplacementPlugin(),
new webpack.NoErrorsPlugin(),
new webpack.optimize.UglifyJsPlugin({sourceMap: false})
], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}));
} else {
  
  
  
}

var config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8585',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel?stage=1&optional=runtime"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
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
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff'
      },
        {
        test: /\.woff2$/, 
        loader: 'url-loader?name=fonts/[name].[ext]&limit=10000'
      },
      {
        test: /\.ttf$/, 
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
        test: /\.eot$/, 
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.woff2$/, 
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

module.exports = config;