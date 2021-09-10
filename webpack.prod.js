import webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { GenerateSW } from "workbox-webpack-plugin";

const config = {
  entry: './src/client/index.js',
  mode: 'production',
  output: {
    libraryTarget: 'var',
    library: 'Client',
    filename: "[name].min.js",
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
      filename: "[name].min.css",
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new GenerateSW(),
    new webpack.DefinePlugin({
      'NODE_ENV': 'production',
    })
  ]
}

export default config