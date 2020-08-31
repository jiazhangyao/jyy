const CompressionWebpackPlugin = require('compression-webpack-plugin');

// devServer配置查看 https://cli.vuejs.org/config/#devserver
const devServer = {
    host: '0.0.0.0',
    proxy: {
        '/inneruser': {
            // target: 'http://192.168.5.111:8089', // 张程本地 inneruser
            target: 'http://172.19.21.245:8080', // 测试环境 inneruser
            changeOrigin: true
        },
        '/paper': {
            target: 'http://172.19.22.6:8080', // 测试环境
            changeOrigin: true,
        },
        '/web': {
            target: 'http://172.19.21.236:8000', // 测试环境
            changeOrigin: true,
        },
        '/web': {
            target: 'ws://172.19.21.236:8000', // 测试环境
            ws: true,
            changeOrigin: true,
        },
        // '/livecenter':{
        //     target: 'http://10.8.0.58:8091', // 测试环境
        //     changeOrigin: true,
        // },
        '/polyvapi': {
            target: 'http://api.polyv.net',
            changeOrigin: true,
            pathRewrite:{
                '/polyvapi': ''
            }
        }
    }
};

let workers = require('os').cpus().length;

if (typeof workers !== 'number') {
    workers = 1;
}

module.exports = {
    devServer: devServer,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //GZIP压缩
            config.plugins.push(
                new CompressionWebpackPlugin({
                    test: /\.(js|css|svg)(\?.*)?$/i, //需要压缩的文件正则
                    threshold: 4096, //文件大小大于这个值时启用压缩
                    deleteOriginalAssets: false //压缩后是否删除原文件
                })
            );
        };
    },
    chainWebpack: config => {
        // const svgRule = config.module.rule('svg');
        // svgRule.uses.clear();
        // svgRule.use('vue-svg-loader').loader('vue-svg-loader');
        // see TerserPlugin compress options document:
        // https://github.com/terser/terser#compress-options
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer('terser').tap((args) => {
                args[0].terserOptions.parallel = workers > 1; // 开启多线程
                args[0].terserOptions.cache = true;
                if (process.env.VUE_APP_SERVER === 'prodServer') {
                    args[0].terserOptions.compress.drop_console = true;
                    args[0].terserOptions.compress.pure_funcs = ['console.log'];
                    args[0].terserOptions.compress.drop_debugger = true;
                }
                return args
            })
        }
        // 去除默认配置中import后缀自动检测中多余的文件后缀
        config.resolve.extensions.clear().add('.vue').add('.ts').add('.js');
        // 为vue开启thread-loader
        config.module.rule('vue').use('thread-loader').loader('thread-loader').options({
            workers: workers
        }).after('cache-loader');
        // 为ant-design修改less-loader配置
        config.module.rule('less').oneOf('normal').use('less-loader').options({
            sourceMap: false,
            javascriptEnabled: true
        });
        config.module.rule('less').oneOf('normal-modules').use('less-loader').options({
            sourceMap: false,
            javascriptEnabled: true
        });
    }
}
