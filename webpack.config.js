const path = require('path');
const webpack = require('webpack');
const bundlePath = path.resolve(__dirname, 'dist/');
const appMode = process.env.NODE_ENV;
let plugin;

if (appMode !== 'production') {
  plugin = new webpack.HotModuleReplacementPlugin();
} else {
  plugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  });
}

module.exports = {
  mode: appMode,
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/images/[name].[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: bundlePath,
    publicPath: '/dist/',
    filename: 'bundle.js',
    chunkFilename: 'static/js/[name].[hash].chunk.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: 'localhost',
    port: '3000',
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
    overlay: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  },
  plugins: [plugin, new webpack.NamedModulesPlugin()],
};
