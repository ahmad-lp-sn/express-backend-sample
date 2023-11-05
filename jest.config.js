/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    silent: false,
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};