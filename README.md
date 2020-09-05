# App Rating Data Pipeline Serverless Stack

This is a AWS serverless solution based on Amazon CDK.
This code creates the following:

* AWS Lambda function AppRatingDataPipe that gets current and past rating of IOS and Android App, does a simple 
aggregation to averages based on different ratings, compare current to historical data and generates objects that can 
be easy persisted in SQL database.
* CloudWatch Event scheduled every day that triggers Lambda function and from which the function gets date information.

## How to Deploy

* Make sure you have `~/.aws/config` and `~/.aws/credentials` and the right privileges. 
* Install AWS CDK using NPM
* Run `npm install && npm run build && npm test`
* Create the main Stack `cdk bootstrap`
* Deploy the stack `cdk deploy`
* Destroy the stack `cdk destroy`

## How to Test
* Go to the new AWS Lambda function, create a test with event of type CloudWatch from which the function will take 
the field (time). Please modify the time filed to a recent date.
* Run the test and observe outputs in CloudWatch Logs.
* You should find: Raw Android and IOS rating data (today and last 7 days), 
the mapped clean and aggregated ratings (each rating average), 
result of percentage of difference between today's ratings and historical ratings.

## Code

* bin/app-rating-data-pipeline.ts: App startup.
* lib/app-rating-data-pipeline-stack.ts: Main Stack
* lib/app-rating-data-pipeline.ts: Lambda Construct.
* lambda/app-rating-data-pipeline.js: Lambda entry
* test/app-rating-data-pipeline.test.ts: Stack resources test.
* test/data-processor.test.js: Lambda sub class tests.