const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/frontend/index.js',
  mode:'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js'
    }
  },
  module:{
    rules:[
          {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test:/\.vue$/,
        loader:'vue-loader',
      },
      {
        test:/\.css$/i,
        use:['style-loader', 'css-loader'],
      },{
        test:/\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
  ],
};
