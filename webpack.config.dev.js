'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'dev/main.tsx'),
    vendor: ['react', 'react-dom']
  },
  target: 'web',
  mode: 'development',
  devServer: {
    compress: false,
    host: '0.0.0.0',
    port: 4000,
    hot: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /\/node_modules\//,
        use: 'babel-loader'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [
              ReactRefreshTypeScript()
            ]
          }),
          transpileOnly: true
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('node-sass'),
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/scss/')]
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset/inline'
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/index.html'
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new ReactRefreshWebpackPlugin()
  ],
  performance: {
    hints: false
  },
  optimization: {
    runtimeChunk: 'single'
  }
};
