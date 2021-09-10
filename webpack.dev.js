import webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    proxy: { '/api': 'http://localhost:8081' }
  },
  output: {
    libraryTarget: 'var',
    library: 'Client'
  },
  module: {
    rules: [
      {
        test: '/\.js$/',
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // extracts CSS into separate files
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': 'development',
    })
  ]
}

export default config;