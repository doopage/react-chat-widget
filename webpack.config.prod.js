'use strict';

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const {BundleDeclarationsWebpackPlugin} = require('bundle-declarations-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    path: path.join(__dirname, '/lib'),
    filename: 'index.js',
    library: {
      name: 'react-chat-widget',
      type: 'umd'
    },
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': require.resolve('./node_modules/react/jsx-runtime')
    }
  },
  target: 'web',
  mode: 'production',
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
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
              api: 'modern',
              implementation: require('sass'),
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new webpack.ProvidePlugin({
      'react': 'React'
    }),
    new BundleDeclarationsWebpackPlugin()
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  }
};
