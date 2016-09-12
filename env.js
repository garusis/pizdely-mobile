'use strict';

/**
 * Created by garusis on 11/09/16.
 */

/**
 * Dependencies
 */
const _ = require('lodash'),
    yargs = require('yargs'),
    nconf = require('nconf'),
    path = require('path');

const pkg = require('./package.json');
const appName = (pkg.name || 'NODE').toUpperCase();

let envObj = {
    loadEnv: load
};

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

function load(env) {
    defaults[`${appName}_ENV`] = env || 'development';

    nconf
        .defaults(defaults)
        .env()
        .argv();

    return envObj.ENV = nconf.get();
}


module.exports = envObj;