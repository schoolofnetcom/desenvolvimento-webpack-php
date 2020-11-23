const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        new BrowserSyncPlugin(
        {
            proxy: 'http://localhost:8000',
            files: [
                {
                    match: [
                        './**/*.php',
                        './**/*.css',
                        './**/*.js',
                    ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                ]
            },
        ]
    }
}