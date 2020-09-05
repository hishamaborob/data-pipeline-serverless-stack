import { Stack, App, StackProps, Duration } from '@aws-cdk/core';
import { Rule, Schedule } from '@aws-cdk/aws-events';
import targets = require('@aws-cdk/aws-events-targets');
import { AppRatingDataPipeline } from './app-rating-data-pipeline';

export class AppRatingDataPipelineStack extends Stack {

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const appRatingDataPipeline = new AppRatingDataPipeline(this, 'AppRatingDataPipeline');

    const rule = new Rule(this, 'AppRatingDataPipelineRule', {
      schedule: Schedule.expression('rate(1 day)')
    });

    rule.addTarget(new targets.LambdaFunction(appRatingDataPipeline.handler));
  }
}
