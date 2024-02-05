/*
 * http://eslint.org/docs/rules/
 */
module.exports = {
    extends: ['pandora-typescript'],
    settings: {
        react: {
            version: '16.0',
        },
    },
    rules: {
        'no-console': 0,
        'import/no-import-module-exports': [
            'error',
            {
                exceptions: ['**/*/cjs.ts'],
            },
        ],
    },
};
