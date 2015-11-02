// INCLUDES
//---------------------------------------------------------
var del = require('del');
var gulp = require('gulp');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var gulpUtil = require('gulp-util');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config.js');

// CONFIG
//---------------------------------------------------------
var paths = {
    buildDir: './build/',
    source: [
        './src/**/*'
    ],
    assets: [
        './demo.html',
        './node_modules/phaser/build/phaser.min.js',
        './assets/**/*'
    ]
};

// TASKS
//---------------------------------------------------------
gulp.task('default', ['dev-server']);
gulp.task('build', ['assets', 'webpack:build']);
gulp.task('assets', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(paths.buildDir));
});
gulp.task('webpack:build', function (callback) {
    var compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
        if (err) throw new gulpUtil.PluginError('webpack', err);
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        callback();
    });
});
gulp.task('dev-server', ['assets'], function (callback) {
    gulp.watch(paths.assets, ['assets']);
    var compiler = webpack(webpackConfig);
    var server = new WebpackDevServer(compiler, {
        contentBase: paths.buildDir,
        stats: {colors: true},
    });
    server.listen(8080, 'localhost', function (err) {
        if (err) throw new gulpUtil.PluginError('webpack-dev-server', err);
        gulpUtil.log('[webpack-dev-server]', 'http://localhost:8080/demo.html');
    });
});
gulp.task('clean', function (callback) {
    del(paths.buildDir).then(function (paths) {
        gulpUtil.log('[del]', paths.join(', '));
        callback();
    });
});
