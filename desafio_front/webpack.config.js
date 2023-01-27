const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const filesHTML = [
    {
        filename: 'index.html',
        chunks: ['index']
    },
    {
        filename: './html/acercaDe.html',
        chunks: ['index']
    },
    {
        filename: './html/Contacto.html',
        chunks: ['index']
    },
    {
        filename: './html/Ayuda.html',
        chunks: ['index']
    },
    {
        filename: './html/IndexPersonaje.html',
        chunks: ['infoUsuarios']
    },
    {
        filename: './html/IndexPruebas.html',
        chunks: ['indexPruebas']
    },
    {
        filename: './html/Hermes.html',
        chunks: ['indexHermes']
    },
    {
        filename: './html/ConsultaIndex.html',
        chunks: ['consulta']
    },
    {
        filename: './html/UsuarioPruebas.html',
        chunks: ['usuariosPruebas']
    },
]

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        allowedHosts: 'all',
        static: {
            directory: path.join(__dirname, '/')
        },
        hot: true,
        open: true
    },
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.(c|sc|sa)ss$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: () => {
                                require('autoprefixer')
                            }
                        }
                    }
                }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    entry: {
        index: './src/index.js',
        indexPruebas:'./src/indexPrueba',
        indexHermes:'./src/js/indexHermes.js',
        infoUsuarios: './src/js/infoUsuarios.js',
        consulta:'./src/js/Consulta.js',
        usuariosPruebas:'./src/js/usuariosPruebas.js',
    },
    optimization: {},
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' },
                { from: 'src/html/*', to: 'html/[name].[ext]' }
            ]
        })
    ].concat(filesHTML.map((templateFile) => new HtmlWebPackPlugin({
        filename: templateFile.filename,
        template: './src/' + templateFile.filename,
        chunks: templateFile.chunks,
        inject: (templateFile.chunks.length == 0) ? false : true
    })))
};