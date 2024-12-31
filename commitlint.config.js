export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // Error level: 2 = error
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'wip', // Add 'wip' as a valid type
      ],
    ],
  },
};
