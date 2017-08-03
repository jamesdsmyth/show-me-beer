const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'//,
        // beers: './src/containers/BeersContainer.js',
        // beer: './src/containers/BeerContainer.js',
        // createBeers: './src/containers/CreateBeerContainer.js',
        // createLocation: './src/containers/CreateLocationContainer.js',
        // location: './src/containers/LocationContainer.js',
        // locations: './src/containers/LocationsContainer.js',
        // savedBeers: './src/containers/SavedBeersContainer.js'
    },
    plugins: [
        // new HTMLWebpackPlugin({
        //     title: 'Code Splitting'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' // Specify the common bundle's name.
        // })
    ],
    output: {
        // filename: '[name].bundle.js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:
                {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /(\.css|\.scss)$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader'
                ]
            },
            // url-loader needed for background images in scss file
            {
                test: /(\.png|\.jpg)$/,
                loader: 'url-loader?limit=1000000'
            },
            // svg-sprite-loader
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader?' + JSON.stringify({
                    name: '[name]_[hash]',
                    prefixize: true
                })
            }
        ]
    }
};
