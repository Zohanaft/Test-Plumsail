const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dotenv = require('dotenv');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

Object.assign(process.env, dotenv.config({ path: '.env' }).parsed);

// не буду добавлять постпроцессинг, обжим файлов, минификаторы
module.exports = {
  mode: 'none',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PORT || 3000,
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', ".css", ".scss"],
    plugins: [new TsconfigPathsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            name: '[name]'
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-modules-typescript-loader",
            options: {
              mode: process.env.CI ? 'verify' : 'emit'
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          { loader: "sass-loader" },
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      generateStatsFile: true,
      statsOptions: { source: false }
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
}
