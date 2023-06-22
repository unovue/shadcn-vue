/* eslint-disable @typescript-eslint/no-var-requires */

import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = 3000;

export default {
  cache: true,

  devServer: {
    host: 'localhost',
    port: PORT,
  },

  devtool: 'source-map',

  entry: [path.resolve(ROOT, 'DEV_ONLY', 'index.tsx')],

  mode: 'development',

  module: {
    rules: [
      {
        include: [path.resolve(ROOT, 'src'), path.resolve(ROOT, 'DEV_ONLY')],
        loader: 'ts-loader',
        options: {
          reportFiles: ['src/*.{ts|tsx}'],
        },
        test: /\.(ts|tsx)$/,
      },
    ],
  },

  output: {
    filename: 'fast-equals.js',
    library: 'fastEquals',
    libraryTarget: 'umd',
    path: path.resolve(ROOT, 'dist'),
    publicPath: `http://localhost:${PORT}/`,
    umdNamedDefine: true,
  },

  plugins: [
    new ESLintWebpackPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin(),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
