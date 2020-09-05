import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import AppRatingDataPipeline = require('../lib/app-rating-data-pipeline-stack');

test('resources created', () => {
  const app = new cdk.App();
  const stack = new AppRatingDataPipeline.AppRatingDataPipelineStack(
    app, 'AppRatingDataPipelineStack');
  expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
  expectCDK(stack).to(haveResource("AWS::Lambda::Permission"));
  expectCDK(stack).to(haveResource("AWS::IAM::Role"));
  expectCDK(stack).to(haveResource("AWS::Events::Rule"));
});