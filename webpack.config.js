module.exports = {
    entry: './index.js',

    output: {
        filename: 'bundle.js',
        publicPath: ''
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:
                {
                    presets:['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            // url-loader needed for background images in scss file
            {
                test: /(\.png|\.jpg)$/,
                loader: 'url-loader?limit=1000000'
            }
        ]
    }
}
