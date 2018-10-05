import { resolve } from 'path';
import * as webpack from 'webpack';

const projectRoot = resolve(__dirname, '../');

const config: webpack.Configuration = {
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  context: projectRoot,
  entry: {
    main: projectRoot + '/src/main.ts',
  },
  output: {
    path: projectRoot + '/dist',
    filename: '[name].package.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    exprContextCritical: false, // @see https://github.com/webpack/webpack/issues/196#issuecomment-397606728
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [],
};

export default config;
