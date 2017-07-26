module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        publicPath: ''
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
