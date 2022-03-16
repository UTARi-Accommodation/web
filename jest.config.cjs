module.exports = {
    verbose: true,
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
        '^.+\\.(js)$': 'babel-jest',
    },
    transformIgnorePatterns: [],
    testTimeout: 43200,
    coveragePathIgnorePatterns: ['node_modules'],
};
