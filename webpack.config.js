const webpack = require('webpack');
const merge = require('webpack-merge');

const BUILD = process.env.NODE_ENV;

const production = {
    entry: "./Painter/index.ts",
    output: {
        filename: "./built/bundle.js",
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        // rules: [
        //   {
        //     enforce: 'pre',
        //     test: /\.js$/,
        //     loader: 'source-map-loader',
        //     exclude: [
        //       /node_modules/
        //     ]
        //   }
        // ],
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    }
}

const development = {
    devtool: "source-map",
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = BUILD === "production" ? production : merge(production, development);