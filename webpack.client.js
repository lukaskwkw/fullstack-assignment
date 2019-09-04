const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");

const babelLoaderConfig = require("./webpack.babel-loader");
const typescriptLoaderConfig = require("./webpack.typescript-loader");

const PRODUCTION_ENV = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.jsx",
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          !PRODUCTION_ENV ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/public",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    proxy: {
      "/api/**": {
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true
      }
    }
  },
  optimization: {
    minimizer: PRODUCTION_ENV
      ? [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
      : []
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/src/assets/index.html",
      filename: __dirname + "/public/index.html"
    })
  ]
};

module.exports = merge(babelLoaderConfig, typescriptLoaderConfig, config);
