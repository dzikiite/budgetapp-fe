module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'prettier'],
    rules: {
        'react/jsx-filename-extension': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: ['function-declaration', 'arrow-function'],
                unnamedComponents: 'arrow-function',
            },
        ],
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-console': 'off',
        'no-restricted-exports': 'off',
        'import/order': 'off',
        'react-hooks/exhaustive-deps': 'error',
        'no-nested-ternary': 'off',
    },
    settings: {
        'import/resolver': {
            jsconfig: {
                config: 'jsconfig.json',
            },
        },
    },
};
