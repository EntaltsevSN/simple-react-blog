const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

module.exports = {
  entry: path.join(__dirname, "/index.js"),
  output: {
    path: path.join(__dirname, "/build"),
    publicPath: '/',
    filename: 'bundle.js?v=[contenthash]'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  },
  module: { 
    rules: [ 
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template  : __dirname + '/build/template-index.html',
      filename : 'index.html',
      inject : 'body'
    })
  ]
}