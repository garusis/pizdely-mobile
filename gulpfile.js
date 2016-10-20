'use strict';
/**
 * Created by garusis on 21/08/16.
 */

/**
 * Dependencies
 */
const gulp = require('gulp'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    gutil = require('gulp-util'),
    yargs = require('yargs'),
    nconf = require('nconf');


/**
 * ErrorConstant Object
 *
 * @param {String} name constant's name
 * @param {String} [color] constant's color
 * @constructor
 */
function ErrorConstant(name, color) {
    this.name = name;
    this.color = color;
}

/**
 * This constant represents an Error that should be thrown
 * @type {ErrorConstant}
 */
ErrorConstant.THROW_ERROR = new ErrorConstant('THROW_ERROR', 'magenta');
/**
 * This constant represents an Error that should be shown as a Warning
 * @type {ErrorConstant}
 */
ErrorConstant.WARNING = new ErrorConstant('WARNING', 'yellow');
/**
 * This constant represents an Error that should not be shown
 * @type {ErrorConstant}
 */
ErrorConstant.SILENT_WARNING = new ErrorConstant('SILENT_WARNING', 'yellow');


const argv = yargs.argv;
const pkg = loadJsonFile('./package.json', ErrorConstant.THROW_ERROR);
const appName = _.snakeCase(pkg.name || 'NODE').toUpperCase();


const defaults = {
    'localapi': false,
    'GULP_CONF_DIR': path.join(process.cwd(), 'gulp'),
    'GULP_TASKS_DIR': path.join(process.cwd(), 'gulp'),
    'availableEnvironments': [
        "development",
        "staging",
        "production"
    ]
};

let ENV = null;

/**
 *
 * @param {Object} error
 * @param {ErrorConstant} [typeError]
 */
function handleError(error, typeError) {
    typeError = typeError || ErrorConstant.WARNING;
    switch (typeError) {
        case ErrorConstant.THROW_ERROR:
            throw error;
            break;
        case ErrorConstant.WARNING:
            gutil.log(gutil.colors[ErrorConstant.WARNING.color](error.message));
            break;
        case ErrorConstant.SILENT_WARNING:
        default:
            break;
    }
}

/**
 *
 * @param {String} path
 * @param {ErrorConstant} [throwError]
 * @returns {Object}
 */
function loadJsonFile(path, throwError) {
    throwError = throwError || ErrorConstant.WARNING;

    try {
        let fileContent = loadFile(path, throwError);
        return JSON.parse(fileContent);
    } catch (err) {
        handleError(err, throwError);
        return {};
    }
}

/**
 *
 * @param {String} path
 * @param {ErrorConstant} [throwError]
 * @returns {String}
 */
function loadFile(path, throwError) {
    throwError = throwError || ErrorConstant.WARNING;
    try {
        return fs.readFileSync(path, {encoding: 'utf8'});
    } catch (err) {
        handleError(err, throwError);
        return "";
    }
}


/**
 *
 * @param {String} module
 * @param {ErrorConstant} [throwError]
 */
function loadTasks(module, throwError) {
    //throwError = throwError || ErrorConstant.WARNING;
    throwError = throwError || ErrorConstant.SILENT_WARNING;
    try {
        require(module)(ENV);
        gutil.log(`Loaded tasks in ${module}`);
    } catch (err) {
        handleError(err, throwError);
        return "";
    }
}

/**
 *
 * @param {String} path
 * @returns {Object}
 */
function loadConfFile(path) {
    try {
        let conf = require(path);
        gutil.log(`Loaded confs in ${path}`);
        return conf;
    } catch (err) {
        handleError(err, ErrorConstant.WARNING);
        return {};
    }
}

/*
 * You can emulate each env in local using file.{ENV_NAME}.local.
 * This allow you overwrite the loaded by file.{ENV_NAME} with file.{ENV_NAME}.local
 *
 * Order of precedence of load configs
 *
 * 1) config.json
 * 2) config.{APPNAME_ENV}.json
 * 3) config.local.json
 * 4) config.{APPNAME_ENV}.local.json
 */

/**
 *
 * @param {String} [env]
 */
function loadConfig(env) {
    let previousEnv = !!ENV;
    ENV = require('./env').loadEnv(env);

    let conf = loadConfFile(path.join(ENV.GULP_CONF_DIR, 'config'));
    let confLocal = loadConfFile(path.join(ENV.GULP_CONF_DIR, 'config.local'));
    let confEnv = loadConfFile(path.join(ENV.GULP_CONF_DIR, `config.${ENV[`${appName}_ENV`]}`));
    let confEnvLocal = loadConfFile(path.join(ENV.GULP_CONF_DIR, `config.${ENV[`${appName}_ENV`]}.local`));

    ENV = _.defaultsDeep(confEnvLocal, confLocal, confEnv, conf, ENV);

    loadTasks(path.join(ENV.GULP_TASKS_DIR, 'tasks.js'));
    loadTasks(path.join(ENV.GULP_TASKS_DIR, `tasks.${ENV[`${appName}_ENV`]}.js`));
    loadTasks(path.join(ENV.GULP_TASKS_DIR, 'tasks.local.js'));
    loadTasks(path.join(ENV.GULP_TASKS_DIR, `tasks.${ENV[`${appName}_ENV`]}.local.js`));

    /**
     * NOTE. Gulp have a limiting with load data in the async way.
     *
     * Step 1). Load Env Vars and Argvs. In gulp conf is possible that Argvs will be not required.
     * BUT can be used to send data to task.
     * Step 2). Using EnvVars, merge results with files by environments.
     * Step 3). Register default Tasks to all environments.
     * Step 4). Load task by environments
     * Note. Load data must be a method that can be called by others envVars
     */


    if (previousEnv) {
        gutil.log(`${ENV[`${appName}_ENV`]} environment started`);
    }
}
loadConfig();

/**
 * Default set env tasks
 */
_.forEach(ENV.availableEnvironments, function (envName) {
    let taskEnvName = `set${_.upperFirst(_.camelCase(envName))}Env`;
    gulp.task(taskEnvName, function () {
        loadConfig(envName);
    });
    gutil.log(gutil.colors.cyan(`${taskEnvName} task attached`));
});

/**
 * Utilities heroku tasks
 * https://github.com/bewest/heroku-buildpack-nodejs-bower-gulp-grunt
 *
 */
_.forEach(ENV.availableEnvironments, function (envName) {
    let taskEnvName = `set${_.upperFirst(_.camelCase(envName))}Env`;
    let herokuTaskEnvName = `heroku:${envName}`;
    gulp.task(herokuTaskEnvName, [taskEnvName, 'buildAssets']);
    gutil.log(gutil.colors.cyan(`${herokuTaskEnvName} task attached`));
});

gutil.log(`Default gulp config finished`);