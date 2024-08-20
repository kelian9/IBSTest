import { Octokit } from '@octokit/core';

const token = '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2';
const octokitInstance = new Octokit({ auth: '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2'.slice(0, token.length - 1) });

export default octokitInstance;
