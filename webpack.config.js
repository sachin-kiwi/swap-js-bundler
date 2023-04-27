const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/swapUtility.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'swap.min.js',
    library: 'SwapUtility',
    libraryTarget: 'umd',
  },module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};
