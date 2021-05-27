module.exports = {
  branches: 'main',
  repositoryUrl:
    'https://github.com/karthickthankyou/bulletproof-boilerplate-train',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/npm',
  ],
};
