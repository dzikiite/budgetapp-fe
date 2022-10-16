const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            context: path.resolve(__dirname, 'src/context'),
            utils: path.resolve(__dirname, 'src/utils'),
            styles: path.resolve(__dirname, 'src/styles'),
            components: path.resolve(__dirname, 'src/components'),
            static: path.resolve(__dirname, 'src/static'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            pages: path.resolve(__dirname, 'src/pages'),
        },
    },
};
