const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        app: path.join(__dirname, 'src','index.jsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.js','.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
              },
              {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
              },
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader',
                options: {
                  name: '/public/icons/[name].[ext]'
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    output: {
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src','index.html')
        })
    ]
}