module.exports = { 
    parser: 'babel-eslint',
    extends: ['airbnb-base','plugin:jest/recommended','airbnb-hooks'],
    env: { 
        'jest/globals': true 
    },
    plugins: ['jest'],
};