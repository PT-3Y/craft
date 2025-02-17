// app.config.js
// returns a webpack config object for the base app settings

// node modules
const path = require('path');

// package.json settings
const pkg = require('../package.json');

// return a webpack config
module.exports = (type = 'modern', settings) => {
    // common config
    const common = () => ({
        entry: settings.entry,
        name: pkg.name,
        output: {
            path: path.resolve(__dirname, settings.paths.dist),
            publicPath: settings.urls.publicPath()
        },
        resolve: {
            alias: settings.alias,
            extensions: settings.extensions,
            modules: [
                path.resolve(__dirname, '../node_modules'),
            ],
        },
        stats: {
            colors: true,
        },
    });
    // configs
    const configs = {
        // development configs
        development: {
            // legacy development config
            legacy: {
            },
            // modern development config
            modern: {
                ...common(),
            },
        },
        // production configs
        production: {
            // legacy production config
            legacy: {
                ...common(),
            },
            // modern production config
            modern: {
                ...common(),
            },
        }
    };

    return configs[process.env.NODE_ENV][type];
}