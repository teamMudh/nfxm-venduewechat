// vue.config.js

const vuxLoader = require('vux-loader')

module.exports = {


    configureWebpack: config => {
        vuxLoader.merge(config, {
            plugins: ['vux-ui']
        })
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://172.18.3.11:40160/vendue-frontend-trade/mobileHttpServlet',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': ''  // rewrite path
                }
            },
        }
    }
};
