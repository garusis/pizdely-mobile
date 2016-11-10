'use strict';
// You can use JS o JSON files to save your settings. Use JS if you need Regexp or any else complex expression.
const currentTime = Date.now();

module.exports = {
    'availableEnvironments': [
        'development',
        'staging',
        'production'
    ],
    'currentTime': currentTime,
    'images': {
        'src': ['./src/assets/images/**/*.jpg', './src/assets/images/**/*.jpeg', './src/assets/images/**/*.png', './src/assets/images/**/*.gif', './src/assets/images/**/*.svg'],
        'base': './src',
        'dst': './dist/'
    },
    'clean': {
        'dir': ['./dist/**/*', '!./dist/.gitkeep', './tmp/**/*', '!./tmp/.gitkeep']
    },
    'copy': {
        'src': ['./src/.htaccess'],
        'base': './src',
        'dst': './dist',
        'assets' : './src/assets/**/*.*',
        'assetsDst' : './dist/assets/'
    },
    'bower': {
        'base': './src/components',
        'dst': {
            'js': './tmp/js/',
            'css': './tmp/css/',
            'fonts': './dist/fonts/'
        }
    },
    'html': {
        'src': ['./assets/**/*.html', './app/**/*.html', './modules/**/*.html']
    },
    'vendors': {
        'src': {
            'less': ['./src/assets/less/vendors/educa.less'],
            'lessIncludes': ['./src/assets/less/vendors', './src/assets/less/vendors/bs-less', './src/assets/less/vendors/educa-less', './src/assets/less/vendors/other-less'],
            'css': ['./src/assets/stylesheets/*.css', './tmp/css/*.css','./src/components/SpinKit/css/spinkit.css'],
            'fonts': ['./src/assets/fonts/*'],
            'js': ['./src/assets/js/*.js'],
            'concatJs': ['./tmp/js/bower_components.min.js', './tmp/js/vendors.min.js']
        },
        'dst': {
            'less': './tmp/css/',
            'css': './dist/css/',
            'fonts': './dist/fonts/',
            'js': './tmp/js/',
            'concatJs': './dist/js/'
        }
    },
    'app': {
        'replacers': {
            'less': {
                images: {search: /\.(gif|jpeg|jpg|png)/ig, newVal: `.$1?timestamp=${currentTime}`}
            },
            'js': {
                images: {search: /\.(gif|jpeg|jpg|png)/ig, newVal: `.$1?timestamp=${currentTime}`}
            },
            'html': {
                files: {search: /\.(gif|jpeg|jpg|png|js|css|html)/ig, newVal: `.$1?timestamp=${currentTime}`}
            }
        },
        'src': {
            'less': ['./src/modules/**/*.less'],
            'lessIncludes': ['./src/assets/less/app', './src/assets/less/app/*'],
            'js': [
                './src/modules/bootstrap/**/*.conf.js', //load all .conf files
                './src/modules/**/*.conf.js', './src/modules/**/*.!(run).js', './src/modules/**/!(*.run).js', //load all controllers, directives and other js files ignoring .run ones
                './src/modules/!(bootstrap)/**/*.run.js', './src/modules/bootstrap/**/*.run.js' //load all .run files but bootstrap .run is left end
            ],
            'htmlTemplates': './src/modules/**/*.html',
            'htmlIndex': './src/index.html'
        },
        'dst': {
            'less': './dist/css/',
            'js': './dist/js/',
            'htmlTemplates': './dist/templates/',
            'htmlIndex': './dist/'
        }
    },
    'test': 'config'
};