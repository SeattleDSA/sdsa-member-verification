// Initialize env vars from .env file, if exists
require('dotenv').config();

const webpack = require('webpack');

const { join } = require('path');

module.exports = {
  entry: [
    "./js/index.js"
  ],
  mode: process.env.NODE_ENV || "development",
  target: "node",
  output: {
    path: join(__dirname, "./dist"),
    filename: "api.js"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-object-rest-spread', 'transform-strict-mode']
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        MAILCHIMP_API_KEY: JSON.stringify(process.env.MAILCHIMP_API_KEY),
        MAILCHIMP_CONTACT_LIST_ID: JSON.stringify(process.env.MAILCHIMP_CONTACT_LIST_ID),
        MAILCHIMP_MEMBER_SEGMENT_ID: JSON.stringify(process.env.MAILCHIMP_MEMBER_SEGMENT_ID)
      }
    })
  ]
};
