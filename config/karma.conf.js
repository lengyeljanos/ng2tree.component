module.exports = function (config) {
    var testWebpackConfig = require('./webpack.test.js');

    var configuration = {

        basePath: '',
        frameworks: ['jasmine'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatchBatchDelay: 300,
        files: [{pattern: './config/spec-bundle.js', watched: false}],
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },
        preprocessors: {
            './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
        },
        exclude: [
            'node_modules/**/*_spec.js'
        ],
        coverageReporter: {
            reporters: [
                {
                    dir: 'reports/coverage/',
                    subdir: '.',
                    type: 'html'
                },{
                    dir: 'reports/coverage/',
                    subdir: '.',
                    type: 'cobertura'
                }, {
                    dir: 'reports/coverage/',
                    subdir: '.',
                    type: 'json'
                }
            ]
        },

        webpack: testWebpackConfig,
        webpackServer: {noInfo: true},
        reporters: [
            'mocha',
            'coverage'
        ]
    };

    config.set(configuration);
};