// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://172.18.3.11:40188/vendue-frontend-trade/webHttpServlet',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': ''  // rewrite path
                }
            },
        }
    }
};
