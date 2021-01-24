const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[
    new VueLoaderPlugin()
  ],
  module:{
    rules:[
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
  }
};
