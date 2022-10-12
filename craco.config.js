const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            context: path.resolve(__dirname, 'src/context'),
            utils: path.resolve(__dirname, 'src/utils'),
        },
    },
};
