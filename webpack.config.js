const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const getPathRelativeToRoot = relativePath =>
  path.join(__dirname, relativePath);
const isProd = process.env.NODE_ENV === 'production';
const previewEnv = process.env.PREVIEW_ENV;

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'inline-source-map',

  entry: {
    // The entry point for your plugin code
    ui: getPathRelativeToRoot('src/index.tsx'),
    code: getPathRelativeToRoot('sandbox/index.ts'),
    plugin: getPathRelativeToRoot('src/plugin.tsx'),
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    openPage: 'index.html',
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
                mode: 'local',
              },
            },
          },
          'less-loader',
        ],
      },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      {
        test: /\.(png|jpg|gif|webp|svg|zip)$/,
        use: [{ loader: 'url-loader' }],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@constants': getPathRelativeToRoot('src/constants'),
    },
  },

  output: {
    filename: '[name].js',
    path: getPathRelativeToRoot('dist'),
  },
  plugins: [
    previewEnv !== 'plugin' &&
      new HtmlWebpackPlugin({
        template: getPathRelativeToRoot('src/index.html'),
        filename: 'index.html',
        chunks: ['ui'],
        inlineSource: '.(js)$',
      }),
    // plugin mode, only compile plugin ui template to avoid too large bundle
    previewEnv === 'plugin' &&
      new HtmlWebpackPlugin({
        template: getPathRelativeToRoot('src/index.html'),
        filename: 'index.html',
        chunks: ['plugin'],
        inlineSource: '.(js)$',
      }),
    new HtmlWebpackInlineSourcePlugin(),
    previewEnv === 'browser' && new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        PREVIEW_ENV: JSON.stringify(process.env.PREVIEW_ENV),
      },
    }),
  ].filter(Boolean),
};
