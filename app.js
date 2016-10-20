'use strict';

/**
 * Created by garusis on 5/03/16.
 */
let express = require('express');
let app = express();
let fs = require('fs');
let https = require('https');
let path = require('path');
let compression = require('compression');
let envLoader = require('./env');

let oneDay = 86400000;

if (require.main === module) {
    envLoader.loadEnv();
}
let ENV = envLoader.ENV;

let workDir = './dist';

if (ENV.COMPRESSION_ENABLED)
    app.use(compression());

if (ENV.PRERENDER_ENABLED)
//app.use(require('prerender-node').set('prerenderServiceUrl', 'http://my_prerender_user:my_prerender_pass@my.own.prerender.server.co'));
    app.use(require('prerender-node').set('prerenderServiceUrl', ENV.PRERENDER_SERVICE_URL));


app.use('/index.html', express.static(`${workDir}/index.html`)); //index.html don't need maxAge

if (ENV.USE_LIVERELOAD) {
    let livereload = require('easy-livereload');
    app.use(livereload({
        watchDirs: [
            path.join(__dirname, 'dist')
        ],
        port: process.env.LIVERELOAD_PORT || 35729
    }));
}

if (ENV.MAX_AGE_DISABLED) {
    app.use(express.static(workDir)); //Any else static file don't need maxAge in local. It's a big problem
} else {
    app.use(express.static(workDir, {maxAge: oneDay}));  //But in cloud all static files should have maxAge as a good practice.
}
//app.use(express.static(workDir));

if (ENV.HTTP_AUTH) {
    let auth = require("http-auth");
    let digest = auth.digest({
        realm: "Private area",
        file: __dirname + "/htpasswd"

    });
    app.use(auth.connect(digest));
}

app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile(`${workDir}/index.html`, {root: __dirname});
});

app.listen(ENV.PORT || 4000, function () {
    console.log('Pizzdely movil listening on http://0.0.0.0:' + (ENV.PORT || 4000));
});
