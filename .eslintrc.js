module.exports = {
    //继承规则 (react官方)
    extends: ['react-app'],
    parserOptions: {
        babelOptions: {
            presets: [
                //解决页面报错问题
                ['babel-preset-react-app', false],
                'babel-preset-react-app/prod'
            ]
        }
    }
}
