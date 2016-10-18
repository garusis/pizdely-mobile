'use strict';
// You can use JS o JSON files to save your settings. Use JS if you need Regexp or any else complex expression.
module.exports = {
    'app': {
        'replacers': {
            'js': {
                fb: {search: '$$fbAppID$$', newVal: 'myDevelopmentFBAppID'},
                api: {search: '$$appApiURL$$', newVal: 'http://localhost:4000/'}
            },
            'html': {
                api: {search: '$$appApiURL$$', newVal: 'myLocalApiURL'},
                base: {search: '$$frontBaseTagURL$$', newVal: 'http://localhost:4000/'}
            }
        }
    }
};