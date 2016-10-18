'use strict';
/**
 * Created by garusis on 15/08/16.
 */

const gulp = require('gulp'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    less = require('gulp-less'),
    mainBowerFiles = require('main-bower-files'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    size = require('gulp-size'),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    yargs = require('yargs');

const packageData = require('../package.json');

module.exports = function (ENV) {


    // Clean dir content. Usually you'll want to drop all dist content before else other task.
    function cleanTask(cb) {
        return del(ENV.clean.dir);
    }

    gulp.task('build:clean', cleanTask);


    // Minify and copy images
    function imageTask(cb) {
        let imagesConf = ENV.images;
        gulp.src(imagesConf.src, {nocase: true, base: imagesConf.base})
            .pipe(gulp.dest(imagesConf.dst, {overwrite: true}))
            .on('finish', cb);
    }

    gulp.task('images', imageTask);
    gulp.task('build:images', ['build:clean'], imageTask);


    function cleanCssPipe(inputStream, title, minName) {
        return inputStream
            .pipe(size({title: title}))
            .pipe(cleanCSS())
            .pipe(size({title: minName}))
            .pipe(autoprefixer({
                browsers: ['> 5%'],
                cascade: false
            }))
            .pipe(concat(minName))
            .pipe(size({title: minName}));
    }

    /**
     * list all bower components main files. To overwrite options like main files and other confs
     * please review https://github.com/ck86/main-bower-files#overrides-options
     */
    function bowerListTask() {
        return gulp
            .src(mainBowerFiles())
            .pipe(debug());
    }

    /**
     * List, concat and minify all bower components js main files. To overwrite options like main files and other confs
     * please review https://github.com/ck86/main-bower-files#overrides-options
     */
    function bowerJSTask() {
        return gulp
            .src(mainBowerFiles({
                filter: '**/*.js',
                checkExistence: true
            }))
            .pipe(size({title: 'bower_components.js'}))
            .pipe(uglify())
            .pipe(concat('bower_components.min.js'))
            .pipe(size({title: 'bower_components.min.js'}))
            .pipe(gulp.dest(ENV.bower.dst.js, {overwrite: true}));
    }

    /**
     * List, concat and minify all bower components js main files. To overwrite options like main files and other confs
     * please review https://github.com/ck86/main-bower-files#overrides-options
     */
    function bowerCSSTask() {
        return gulp
            .src(mainBowerFiles({
                filter: '**/*.css',
                checkExistence: true
            }))
            .pipe(gulp.dest(ENV.bower.dst.css, {overwrite: true}));
    }

    /**
     * List, copy and paste all bower components fonts main files. To overwrite options like main files and other confs
     * please review https://github.com/ck86/main-bower-files#overrides-options
     */
    function bowerFontTask() {
        return gulp
            .src(mainBowerFiles({
                filter: '**/fonts/*',
                checkExistence: true
            }))
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(ENV.bower.dst.fonts, {overwrite: true}));
    }

    gulp.task('bower-js', ['build:clean'], bowerJSTask);
    gulp.task('bower-css', ['build:clean'], bowerCSSTask);
    gulp.task('bower-fonts', ['build:clean'], bowerFontTask);
    gulp.task('bower-list', bowerListTask);


    function vendorLessTask() {
        return gulp
            .src(ENV.vendors.src.less)
            .pipe(less({
                paths: ENV.vendors.src.lessIncludes
            }))
            .pipe(gulp.dest(ENV.vendors.dst.less, {overwrite: true}));
    }

    function vendorCssTask() {
        let before = gulp.src(ENV.vendors.src.css);
        return cleanCssPipe(before, 'vendors.css', 'vendors.min.css')
            .pipe(gulp.dest(ENV.vendors.dst.css, {overwrite: true}));
    }

    function vendorFontTask() {
        return gulp
            .src(ENV.vendors.src.fonts)
            .pipe(gulp.dest(ENV.bower.dst.fonts, {overwrite: true}));
    }

    function vendorJSTask() {
        return gulp
            .src(ENV.vendors.src.js)
            .pipe(size({title: 'vendors.js'}))
            .pipe(uglify())
            .pipe(concat('vendors.min.js'))
            .pipe(size({title: 'vendors.min.js'}))
            .pipe(gulp.dest(ENV.vendors.dst.js, {overwrite: true}));
    }

    function vendorConcatJSTask() {
        return gulp
            .src(ENV.vendors.src.concatJs)
            .pipe(concat('vendors.min.js'))
            .pipe(size({title: 'vendors.min.js'}))
            .pipe(gulp.dest(ENV.vendors.dst.concatJs, {overwrite: true}));
    }

    gulp.task('vendor-less', ['build:clean'], vendorLessTask);
    gulp.task('vendor-css', ['build:clean', 'bower-css', 'vendor-less'], vendorCssTask);
    gulp.task('vendor-fonts', ['build:clean'], vendorFontTask);
    gulp.task('vendor-js', ['build:clean'], vendorJSTask);
    gulp.task('vendor-concat-js', ['build:clean', 'bower-js', 'vendor-js'], vendorConcatJSTask);
    gulp.task('build:vendors', ['build:clean', 'vendor-concat-js', 'bower-fonts', 'vendor-fonts', 'vendor-css']);


    function appLessTask() {
        let before = gulp
            .src(ENV.app.src.less)
            .pipe(less({
                paths: ENV.app.src.lessIncludes
            }));

        let beforeReplacers = cleanCssPipe(before, 'app.css', 'app.min.css');

        _.forEach(ENV.app.replacers.less, function (replacer) {
            beforeReplacers = beforeReplacers
                .pipe(replace(replacer.search, replacer.newVal));
        });

        return beforeReplacers
            .pipe(gulp.dest(ENV.app.dst.less, {overwrite: true}));
    }

    function appJSTask() {
        let beforeReplacers = gulp
            .src(ENV.app.src.js)
            .pipe(size({title: 'app.js'}))
            .pipe(sourcemaps.init())
            //.pipe(uglify())
            .pipe(concat('app.min.js'))
            .pipe(sourcemaps.write("."))
            .pipe(size({title: 'app.min.js'}));

        _.forEach(ENV.app.replacers.js, function (replacer) {
            beforeReplacers = beforeReplacers
                .pipe(replace(replacer.search, replacer.newVal));
        });

        return beforeReplacers
            .pipe(gulp.dest(ENV.app.dst.js, {overwrite: true}));
    }

    gulp.task('app-less', appLessTask);
    gulp.task('app-js', appJSTask);

    gulp.task('build:app-less', ['build:clean'], appLessTask);
    gulp.task('build:app-js', ['build:clean'], appJSTask);

    gulp.task('watch:app-less', function () {
        return gulp.watch(ENV.app.src.less, ['app-less']);
    });
    gulp.task('watch:app-js', function () {
        return gulp.watch(ENV.app.src.js, ['app-js']);
    });

    gulp.task('build:app', ['build:clean', 'build:app-js', 'build:app-less']);


    function htmlTask(htmlPaths, dirname) {
        let beforeReplacers = gulp.src(htmlPaths)
            .pipe(htmlmin({collapseWhitespace: true}));

        _.forEach(ENV.app.replacers.html, function (replacer) {
            beforeReplacers = beforeReplacers
                .pipe(replace(replacer.search, replacer.newVal));
        });

        return beforeReplacers
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(dirname));
    }

    function htmlTemplates() {
        return htmlTask(ENV.app.src.htmlTemplates, ENV.app.dst.htmlTemplates);
    }

    function htmlIndex() {
        return htmlTask(ENV.app.src.htmlIndex, ENV.app.dst.htmlIndex);
    }

    gulp.task('html-templates', htmlTemplates);
    gulp.task('html-index', htmlIndex);

    gulp.task('build:html-templates', ['build:clean'], htmlTemplates);
    gulp.task('build:html-index', ['build:clean'], htmlIndex);

    gulp.task('watch:html-templates', function () {
        return gulp.watch(ENV.app.src.htmlTemplates, ['html-templates']);
    });
    gulp.task('watch:html-index', function () {
        return gulp.watch(ENV.app.src.htmlIndex, ['html-index']);
    });

    gulp.task('build:html', ['build:clean', 'build:html-index', 'build:html-templates']);


    gulp.task('test', function () {
        return gulp
            .src([])
            .pipe(debug());
    });

    gulp.task('webserver', function () {
        gutil.log('Local front-end server started');
        require('./../app.js');
    });

    /**
     * List, copy and paste all bower components fonts main files. To overwrite options like main files and other confs
     * please review https://github.com/ck86/main-bower-files#overrides-options
     */
    function copyTask() {
        return gulp.src(ENV.copy.src, {nocase: true, base: ENV.copy.base})
            .pipe(gulp.dest(ENV.copy.dst, {overwrite: true}));
    }

    gulp.task('build:copy', ['build:clean'], copyTask);


    /**
     * Default task
     */
    gulp.task('watch', ['watch:app-less', 'watch:app-js', 'watch:html-templates', 'watch:html-index']);
    gulp.task('buildAssets', ['build:clean', 'build:images', 'build:vendors', 'build:app', 'build:html', 'build:copy']);
    gulp.task('default', ['buildAssets', 'watch', 'webserver']);

    /**
     * Task to run task and server as an specific environment.
     * The generated tasks are something like ´gulp.task('dev:production', ['setProductionEnv', 'buildAssets', 'watch']);´
     */
    _.forEach(ENV.availableEnvironments, function (envName) {
        let taskEnvName = `set${_.upperFirst(_.camelCase(envName))}Env`;
        let herokuTaskEnvName = `dev:${envName}`;
        gulp.task(herokuTaskEnvName, [taskEnvName, 'buildAssets']);
        gutil.log(gutil.colors.cyan(`${herokuTaskEnvName} task attached`));
    });

    gulp.task('dev:production', ['setProductionEnv', 'buildAssets', 'watch']);
    gulp.task('dev:staging', ['setStgEnv', 'buildAssets', 'watch']);
    gulp.task('dev:development', ['setDevelopmentEnv', 'buildAssets', 'watch']);
};
