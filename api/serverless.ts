import type { AWS } from '@serverless/typescript';

import contact from '@functions/contact';

const serverlessConfiguration: AWS = {
  service: 'ryohei-takagi-me-api',
  frameworkVersion: '2',
  variablesResolutionMode: '20210326',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
    runtime: 'nodejs14.x',
    timeout: 10,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SLACK_WEBHOOK_URL: "${self:custom.secrets.SLACK_WEBHOOK_URL}",
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { contact },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    secrets: "${ssm(ap-northeast-1):/aws/reference/secretsmanager/ryohei-takagi.me}",
  },
};

module.exports = serverlessConfiguration;
