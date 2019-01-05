module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
};
