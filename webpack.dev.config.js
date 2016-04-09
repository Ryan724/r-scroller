process.env.NODE_ENV = 'development';

module.exports = require("./webpack.config")({
    devServer: true,
    minimize: false,
    devtool: "eval",
    hotComponents: false,
    debug: true
});