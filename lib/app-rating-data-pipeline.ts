import { Construct, Duration, StackProps } from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';

export class AppRatingDataPipeline extends Construct {

    public readonly handler: Function;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id);

        this.handler = new Function(this, 'AppRatingDataPipelineHandler', {
            runtime: Runtime.NODEJS_10_X,
            handler: 'app-rating-data-pipeline.handler',
            code: Code.fromAsset('lambda'),
            timeout: Duration.seconds(10)
        });
    }
}
