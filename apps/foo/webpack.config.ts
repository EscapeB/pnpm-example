import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
import BundleAnalyser from 'webpack-bundle-analyzer';
import HtmlPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const config: Configuration = {
  entry: './src/index.tsx',
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    port: 4000,
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new BundleAnalyser.BundleAnalyzerPlugin(),
  ],
};

export default config;
